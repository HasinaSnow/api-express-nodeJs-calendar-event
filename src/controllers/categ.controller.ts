import { Request, Response } from "express";
import { CategValidator } from "../models/categ/categ.validator";
import { Categ } from "../models/categ/categ.model";
import { BaseController } from "./base.controller";

export class CategController extends BaseController {

    constructor(req: Request, res: Response) {
        super(req, res, 'Category', new Categ(), new CategValidator())
    }

}