import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { SUBJECT } from "../data/default-collection-name";
import { Service } from "../models/service/service.model";
import { ServiceUpdateValidator, ServiceValidator } from "../models/service/service.validator";
import { ServicePermission } from "../permission/service.permission";

export class ServiceController extends BaseController {

    constructor(req: Request, res: Response) {
        super(
            req,
            res,
            SUBJECT.service,
            new Service(),
            new ServiceValidator(),
            new ServiceUpdateValidator(),
            new ServicePermission(req)
            )
    }

}