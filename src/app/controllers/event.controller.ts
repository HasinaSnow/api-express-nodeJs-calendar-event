import { Request, Response } from "express";
import { Event, IFilterEvent } from "../models/event/event.model";
import { EventUpdateValidator, EventValidator } from "../models/event/event.validator";
import { BaseController } from "./base.controller";
import { EventPermission } from "../permission/event.permission";
import { SUBJECT } from "../data/default-collection-name";
import { User } from "../models/user/user.model";
import { getUidToken } from "../utils/utils";

export class EventController extends BaseController {

    constructor(req: Request, res: Response, private event: Event = new Event()) {
        super(
            req,
            res,
            SUBJECT.event,
            event,
            new EventValidator(),
            new EventUpdateValidator(),
            new EventPermission(req)
            )
    }

    async indexAttribuable() {
        // params
        const filterParams: IFilterEvent = {
            date: parseInt(this.req.params.date) || undefined,
            month: parseInt(this.req.params.month) || undefined,
            year: parseInt(this.req.params.year) || undefined,
            categId: this.req.params.categId
        }
        const limitMonthIndex: number = parseInt(this.req.params.limit_month) || 11

        let serviceRefs: string[]
        if(await this.isPermis.toViewIndex())
            serviceRefs = []
        else {
            const userId = await getUidToken(this.req)
            serviceRefs = await new User().getServiceRefs(userId)
            if(serviceRefs.length == 0)
                serviceRefs = ['serviceRefsIsEmpty']
        }

        return this.event.getByServices(limitMonthIndex, serviceRefs)
            .then(result => { 
                const data = this.event.getfilterEvent(result.docs, filterParams)
                const dataFormated = this.model.formatView(data)
                return this.response.successfullGetted(dataFormated)
            })
            .catch(error => this.response.errorServer(error))
    }

    indexServiceRefs(eventId: string) {
        return this.event.getServiceRefs(eventId)
    }

}