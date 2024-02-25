import { Request, Response } from "express";
import { RegisterValidator } from "../models/account/register.validator";
import { isEmail, validate } from "class-validator";
import { ResponseService } from "../utils/response";
import { AccountModel } from "../models/account/account.model";
import { ILogin, IRegister } from "../models/account/account.interface";
import { LoginValidator } from "../models/account/login.validator";

export class AccountController {
  private dataSignUp: IRegister;
  private dataLogin: ILogin;

  constructor(
    private req: Request,
    private res: Response,
    private model: AccountModel = new AccountModel(),
    private response: ResponseService = new ResponseService(res, "Account")
  ) {}

  async signup() {
    // verify input validation and subsrciber account
    if (await this.registerValid()) {
      // create the user and send confirmation key
      this.model
        .register(this.dataSignUp)
        .then((userCredential) => {
            this.model.sendEmailConfirmation(userCredential.user)
                .then((value) => this.response.sendingConfirmationKey(value, "email"))
        })
        .catch((error) => this.response.errorServer(error.message));
    }
  }

  async signin() {
    if (await this.loginValid()) {
      // get user
      this.model.login(this.dataLogin)
        .then((creds) => {
          console.log('___auth___', this.model.currentUser()?.email)
            // verify emailVerified
            if (!creds.user.emailVerified)
                return this.response.emailNotVerified();

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
    console.log('___coucu')
    const token = this.req.header('Authorization')?.split(' ')[1]
    if(!token)
      return this.response.invalidRequest()

    console.log('___token', token)
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
}
