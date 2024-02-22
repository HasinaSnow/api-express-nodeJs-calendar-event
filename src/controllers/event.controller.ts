import { Request, Response } from "express";
import { Event } from "../models/event/event.model";
import { EventValidator } from "../models/event/event.validator";
import { BaseController } from "./base.controller";

export class EventController extends BaseController {

    constructor(req: Request, res: Response) {
        super(req, res, 'Event', new Event(), new EventValidator())
    }

}