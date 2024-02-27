import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { RoleUserPermission } from "../permission/role-user.permission";
import { SUBJECT } from "../data/default-collection-name";
import { RoleUser } from "../models/role-user/role-user.model";
import { RoleUserValidator, RoleUserUpdateValidator } from "../models/role-user/role-user.validator";

export class RoleUserController extends BaseController {

    constructor(req: Request, res: Response) {
        super(
            req,
            res,
            SUBJECT.roleUser,
            new RoleUser(), 
            new RoleUserValidator(),
            new RoleUserUpdateValidator(),
            new RoleUserPermission(req)
        )
    }

}