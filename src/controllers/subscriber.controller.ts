import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { Subscriber } from "../models/subscriber/subscriber.model";
import { SubscriberUpdateValidator, SubscriberValidator } from "../models/subscriber/subscriber.validator";
import { SUBJECT } from "../data/default-collection-name";
import { SubscriberPermission } from "../permission/subscriber.permission";

export class SubscriberController extends BaseController {

    constructor(req: Request, res: Response) {
        super(
            req,
            res,
            SUBJECT.subscriber,
            new Subscriber(),
            new SubscriberValidator(),
            new SubscriberUpdateValidator(),
            new SubscriberPermission(req)
        )
    }
}