import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { SUBJECT } from "../data/default-collection-name";
import { ServiceUser } from "../models/service-user/service-user.model";
import { ServiceUserUpdateValidator, ServiceUserValidator } from "../models/service-user/service-user.validator";
import { ServiceUserPermission } from "../permission/service-user.permission";

export class ServiceUserController extends BaseController {

    constructor(req: Request, res: Response) {
        super(
            req,
            res,
            SUBJECT.serviceUser,
            new ServiceUser(), 
            new ServiceUserValidator(),
            new ServiceUserUpdateValidator(),
            new ServiceUserPermission(req)
        )
    }

}