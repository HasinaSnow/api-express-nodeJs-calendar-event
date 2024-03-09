import { Request, Response } from "express";
import { validate } from "class-validator";
import { ResponseService } from "../utils/response";
import { Account } from "../models/account/account.model";
import { ILogin, IRegister } from "../models/account/account.interface";
import { SUBJECT } from "../data/default-collection-name";
import { LoginValidator } from "../models/account/login.validator";
import { RegisterValidator } from "../models/account/register.validator";
import { IValidator } from "../models/validator.interface";

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
    this.validate(new RegisterValidator())

    // register
    try {
      const creds = await this.model.register(this.dataSignUp)
      // save name user
      await this.model.storeDisplayName(creds.user.uid, this.dataSignUp.name)
      // send email confirmation
      await this.model.sendEmailConfirmation(creds.user)
    } catch (error) {
      return this.response.errorServer(error)
    }
    return this.response.sendingConfirmationKey([], "email")
  }

  async signin() {
    // verify validation
    this.validate(new LoginValidator())

    // login
    this.model.login(this.dataLogin)
      .then(async (creds) => {
          // verify email
          if (!creds.user.emailVerified)
            return this.response.emailNotVerified();

          // verifie if the user account exists
          if(!(await this.model.getUser(creds.user.uid)).exists) {
            // create user for this account
            try {
              this.model.createUser(creds)
            } catch (error) {
              return this.response.errorServer(error)
            }
          }
          // send a success response signin with token JWT
          return creds.user.getIdToken()
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

  async signout() {
    const token = this.req.header('Authorization')?.split(' ')[1]
    if(!token)
      return this.response.invalidRequest()

      this.model.verifyToken(token)
        .then(value => {
          this.model.logout(value.uid)
            .then(_ => this.response.successLogout())
        })
        .catch(_ => this.response.invalidRequest())
  }

  validate(validationType: IValidator) {
    this.dataLogin = validationType.init(this.req.body ) as ILogin
    validate(validationType).then((errors) => {
      if (errors.length > 0) return this.response.errorValidation(errors);
    });
  }

}
