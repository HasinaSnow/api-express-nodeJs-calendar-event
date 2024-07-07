import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { SUBJECT } from "../data/default-collection-name";
import { SubscriberPermission } from "../permission/subscriber.permission";
import { Subscriber } from "../models/subscriber/subscriber.model";
import { SubscriberValidator, SubscriberUpdateValidator } from "../models/subscriber/subscriber.validator";

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