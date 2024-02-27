import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { User } from "../models/user/user.model";
import { UserUpdateValidator, UserValidator } from "../models/user/user.validator";
import { validate } from "class-validator";
import { UserPermission } from "../permission/user.permission";
import { SUBJECT } from "../data/default-collection-name";

export class UserController extends BaseController {

    private userUpdateValidator: UserUpdateValidator

    constructor(req: Request, res: Response) {
        const updateValidator = new UserUpdateValidator()
        super(
            req,
            res,
            SUBJECT.user,
            new User(),
            new UserValidator(),
            updateValidator,
            new UserPermission(req)
        )
        this.userUpdateValidator = updateValidator
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

}