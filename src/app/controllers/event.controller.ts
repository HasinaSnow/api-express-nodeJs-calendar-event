import { Request, Response } from "express";
import { Event } from "../models/event/event.model";
import { EventUpdateValidator, EventValidator } from "../models/event/event.validator";
import { BaseController } from "./base.controller";
import { EventPermission } from "../permission/event.permission";
import { SUBJECT } from "../data/default-collection-name";

export class EventController extends BaseController {
    private eventModel: Event

    constructor(req: Request, res: Response) {
        const event = new Event()
        super(
            req,
            res,
            SUBJECT.event,
            event,
            new EventValidator(),
            new EventUpdateValidator(),
            new EventPermission(req)
            )
        this.eventModel = event
    }

    async indexForAtribuables() {
    }

}