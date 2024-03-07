import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { validate } from "class-validator";
import { UserPermission } from "../permission/user.permission";
import { SUBJECT } from "../data/default-collection-name";
import { User } from "../models/user/user.model";
import { UserUpdateValidator, UserValidator } from "../models/user/user.validator";

export class UserController extends BaseController {

    constructor(
        req: Request,
        res: Response,
        private user: User = new User(),
    ) {
        super(
            req,
            res,
            SUBJECT.user,
            user,
            new UserValidator(),
            new UserUpdateValidator(),
            new UserPermission(req)
        )
    }

    updateUserPublicInfos() {
        const id = this.req.params.id
        const data = this.updateValidator.init(this.req.body)

        validate(this.updateValidator).then(errors => {
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

    indexServiceRefs(userId: string) {
        return this.user.getServiceRefs(userId)
    }

}