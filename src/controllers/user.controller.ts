import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { User } from "../models/user/user.model";
import { UserUpdateValidator, UserValidator } from "../models/user/user.validator";
import { validate } from "class-validator";

export class UserController extends BaseController {

    private userUpdateValidator: UserUpdateValidator

    constructor(req: Request, res: Response) {
        super(req, res, 'User', new User(), new UserValidator(), new UserUpdateValidator())
        this.userUpdateValidator = new UserUpdateValidator()
    }

    updateUserPublicInfos() {
        const id = this.req.params.id
        const data = this.userUpdateValidator.init(this.req.body)

        validate(this.userUpdateValidator).then(errors => {
            if(errors.length > 0)
                return this.response.errorValidation(errors)

            this.model.update(id, data)
                .then(value => this.response.successfullUpdated(value as any))
                .catch(error => (error.code == 5)
                    ? this.response.notFound() 
                    : this.response.errorServer(error)
                )
        })
    }

    updateEmail() {

    }

}