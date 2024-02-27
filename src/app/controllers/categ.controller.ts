import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { CategPermission } from "../permission/categ.permission";
import { SUBJECT } from "../data/default-collection-name";
import { Categ } from "../models/categ/categ.model";
import { CategUpdateValidator, CategValidator } from "../models/categ/categ.validator";

export class CategController extends BaseController {

    constructor(req: Request, res: Response) {
        super(
            req,
            res,
            SUBJECT.categ,
            new Categ(),
            new CategValidator(),
            new CategUpdateValidator(),
            new CategPermission(req)
            )
    }

}