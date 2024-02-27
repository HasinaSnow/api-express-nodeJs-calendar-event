import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { Subscriber } from "../models/subscriber/subscriber.model";
import { SubscriberUpdateValidator, SubscriberValidator } from "../models/subscriber/subscriber.validator";

export class SubscriberController extends BaseController {

    constructor(req: Request, res: Response) {
        super(req, res, 'Subscriber', new Subscriber(), new SubscriberValidator(), new SubscriberUpdateValidator())
    }
}