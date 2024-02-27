import { Request, Response } from "express";
import { Event } from "../models/event/event.model";
import { EventUpdateValidator, EventValidator } from "../models/event/event.validator";
import { BaseController } from "./base.controller";
import { EventPermission } from "../permission/event.permission";

export class EventController extends BaseController {

    constructor(req: Request, res: Response) {
        super(
            req,
            res,
            'Category',
            new Event(),
            new EventValidator(),
            new EventUpdateValidator(),
            new EventPermission(req)
        )
    }

}