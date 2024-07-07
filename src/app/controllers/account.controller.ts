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
  private requestValidated: IRegister|ILogin;

  constructor(
    private req: Request,
    private res: Response,
    private model: Account = new Account(),
    private response: ResponseService = new ResponseService(res, SUBJECT.account)
  ) {}

  async signup() {
    await this.validate(new RegisterValidator())
    const registerData: IRegister = this.requestValidated as IRegister

    // register
    this.model.register(registerData)
      .then(async creds => {
        // save name user
        await this.model.storeDisplayName(creds.user.uid, registerData.name)
        // send email confirmation
        await this.model.sendEmailConfirmation(creds.user)
        // return suceess response
        return this.response.sendingConfirmationKey([], "email")
      })
      .catch ((error) => this.response.errorServer(error))
  }

  async signin() {
    // verify validation
    await this.validate(new LoginValidator())
    const loginData: ILogin = this.requestValidated as ILogin
    // login
    this.model.login(loginData)
      .then(async (creds) => {
          // verify email
          if (!creds.user.emailVerified)
            return this.response.emailNotVerified();

          // verifie if the user account exists
          if(!(await this.model.getUser(creds.user.uid)).exists) {
            // create user for this account
            try {
              await this.model.createUser(creds)
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

  async validate(validationType: IValidator) {
    this.requestValidated = validationType.init(this.req.body ) as IRegister|ILogin
    const errors = await validate(validationType)
      if (errors.length > 0) return this.response.errorValidation(errors);
  }

}
