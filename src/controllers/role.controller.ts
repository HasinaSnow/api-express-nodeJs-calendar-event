import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { Role } from "../models/role/role.model";
import { RoleUpdateValidator, RoleValidator } from "../models/role/role.validator";
import { RolePermission } from "../permission/role.permission";
import { SUBJECT } from "../data/default-collection-name";

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