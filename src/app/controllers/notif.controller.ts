import { Request, Response } from "express";
import { getUidTokenInRequest } from "../utils/utils";
import { Notif } from "../models/notif/notif.model";
import { isDateString } from "class-validator";
import { ResponseService } from "../utils/response";
import { SUBJECT } from "../data/default-collection-name";

export class NotifController {
    response: ResponseService

    constructor(private req: Request, private res: Response, private model: Notif = new Notif()) {
        this.response = new ResponseService(res, SUBJECT.notif)
    }

    async index() {
        const limit = this.req.params.limit !== undefined 
            ? !Number.isNaN(parseInt(this.req.params.limit))
            ? parseInt(this.req.params.limit)
            : 15 : 15
        const lastField = isDateString(this.req.params.lastField) ? new Date(this.req.params.lastField) : undefined

        return this.model.getByUser(await getUidTokenInRequest(this.req), limit, lastField, undefined)
            .then((result) => {
                const data = this.model.formatView(result)
                return this.response.successfullGetted(data)
            })
            .catch(error => this.response.errorServer(error))
    }

    async indexNotRead() {
    }

}