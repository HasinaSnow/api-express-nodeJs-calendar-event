import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { SUBJECT } from "../data/default-collection-name";

export class NotifController extends BaseController {

    constructor(req: Request, res: Response) {
        super(
            req,
            res,
            SUBJECT.notif,
            new Notif(),
            new NotifValidator(),
            new NotifUpdateValidator(),
            new NotifPermission(req)
            )
    }

}