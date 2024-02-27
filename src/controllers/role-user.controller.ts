import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { RoleUserUpdateValidator, RoleUserValidator } from "../models/role-user/role-user.validator";
import { RoleUser } from "../models/role-user/role-user.model";
import { RoleUserPermission } from "../permission/role-user.permission";

export class RoleUserController extends BaseController {

    constructor(req: Request, res: Response) {
        super(
            req,
            res,
            'The RoleUser',
            new RoleUser(), 
            new RoleUserValidator(),
            new RoleUserUpdateValidator(),
            new RoleUserPermission(req)
        )
    }

}