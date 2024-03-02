import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { SUBJECT } from "../data/default-collection-name";
import { EventService } from "../models/event-service/event-service.model";
import { EventServiceUpdateValidator, EventServiceValidator } from "../models/event-service/event_-service.validator";
import { EventServicePermission } from "../permission/event-service.permission";

export class EventServiceController extends BaseController {

    constructor(req: Request, res: Response) {
        super(
            req,
            res,
            SUBJECT.eventService,
            new EventService(), 
            new EventServiceValidator(),
            new EventServiceUpdateValidator(),
            new EventServicePermission(req)
        )
    }

}