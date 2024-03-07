import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { SUBJECT } from "../data/default-collection-name";
import { Service } from "../models/service/service.model";
import { ServiceUpdateValidator, ServiceValidator } from "../models/service/service.validator";
import { ServicePermission } from "../permission/service.permission";

export class ServiceController extends BaseController {

    constructor(req: Request, res: Response, protected service: Service = new Service()) {
        super(
            req,
            res,
            SUBJECT.service,
            service,
            new ServiceValidator(),
            new ServiceUpdateValidator(),
            new ServicePermission(req)
            )
    }

    indexUserRefs(serviceId: string) {
        return this.service.getUserRefs(serviceId)
    }

    /**
     * get all refs of events for the specific serviceId
     * @param string serviceId
     * @return Promise<string>
     */
    indexEventRefs(serviceId: string) {
        return this.service.getEventRefs(serviceId)
    }

}