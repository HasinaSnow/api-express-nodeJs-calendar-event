import { Request, Response } from "express";
import { isEmail, validate } from "class-validator";
import { ResponseService } from "../utils/response";
import { Account } from "../models/account/account.model";
import { ILogin, IRegister } from "../models/account/account.interface";
import { SUBJECT } from "../data/default-collection-name";
import { User } from "../models/user/user.model";
import { LoginValidator } from "../models/account/login.validator";
import { RegisterValidator } from "../models/account/register.validator";

export class AccountController {
  private dataSignUp: IRegister;
  private dataLogin: ILogin;

  constructor(
    private req: Request,
    private res: Response,
    private model: Account = new Account(),
    private response: ResponseService = new ResponseService(res, SUBJECT.account)
  ) {}

  async signup() {
    // verify input validation and subsrciber account
    if (await this.registerValid()) {
      // create the user and send confirmation key
      this.model
        .register(this.dataSignUp)
        .then((userCredential) => {
            this.model.storeDisplayName(userCredential.user.uid, this.dataSignUp)
              .then(userRecord => {
                this.model.sendEmailConfirmation(userCredential.user)
                  .then((value) => {
                    const data = { name: userRecord.displayName, email: userRecord.email, userRef: userRecord.uid }
                    new User().create(data)
                      .then(_ => this.response.sendingConfirmationKey(value, "email"))
                  })
              })
        })
        .catch((error) => this.response.errorServer(error.message));
    }
  }

  async signin() {
    if (await this.loginValid()) {

      // get user
      this.model.login(this.dataLogin)
        .then(async (creds) => {

            // verify emailVerified
            if (!creds.user.emailVerified)
            return this.response.emailNotVerified();

          console.log('___displayName___', await this.haveAccount(creds.user.uid as string))
            // verify account user
            if(!await this.haveAccount(creds.user.uid as string))
              this.createAccount(creds.user.uid, creds.user.displayName as string)
                .catch(error => this.response.errorServer(error))

            // generate token
            this.model.generateToken(creds.user.uid)
              creds.user.getIdToken()
                  .then(token => this.response.successlogin(token))
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/invalid-credential":
                    this.response.invalidRequest('The email or password is invalid.')
                    break;

                default:
                    this.response.errorServer(error)
                    break;
            }

        });
    }
  }

  async signout() {
    const token = this.req.header('Authorization')?.split(' ')[1]
    if(!token)
      return this.response.invalidRequest()

      this.model.verifyToken(token)
        .then(value => {
          this.model.logout(value.uid)
            .then(_ => this.response.successLogout())
        })
        .catch(error => this.response.invalidRequest())
  }

  private async loginValid() {
    const validator = new LoginValidator();
    this.dataLogin = validator.init(this.req.body);
    return validate(validator).then((errors) => {
      if (errors.length > 0) {
        this.response.errorValidation(errors);
        return false;
      }
      return true;
    });
  }

  private async registerValid() {
    // validate the inputs
    const validator = new RegisterValidator();
    this.dataSignUp = validator.init(this.req.body);
    return validate(validator).then((errors) => {
      if (errors.length > 0) {
        this.response.errorValidation(errors);
        return false;
      }
      return true;
    });
  }

  private async haveAccount(userRef: string) {
    return await this.model.haveAccount(userRef)
  }

  private createAccount(userRef: string, name: string) {
    return this.model.createAccount(userRef, name)
  }
}
