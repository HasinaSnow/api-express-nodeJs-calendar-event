import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { RolePermission } from "../permission/role.permission";
import { SUBJECT } from "../data/default-collection-name";
import { Role } from "../models/role/role.model";
import { RoleValidator, RoleUpdateValidator } from "../models/role/role.validator";

export class RoleController extends BaseController {
    constructor(req: Request, res: Response) {
        super(
            req,
            res,
            SUBJECT.role,
            new Role(),
            new RoleValidator(),
            new RoleUpdateValidator(),
            new RolePermission(req)
            )
    }
}