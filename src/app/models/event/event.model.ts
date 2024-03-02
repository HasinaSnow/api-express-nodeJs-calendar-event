import { db } from "../../config/firebaseConfig"
import { COLLECTION } from "../../data/default-collection-name"
import { BaseModel } from "../base.model"

export interface IDateEventFilter {
    date?: number,
    month?: number,
    year?: number
}

export class Event extends BaseModel {

    constructor() {
        super(db.collection(COLLECTION.event))
    }

    /**
     * retriev all events for the id services specified
     */
    async forServices(servicesRefs: string[], filter: IDateEventFilter) {
        return (await this.collection.where('serviceRefs', 'array-contains', servicesRefs).get()).docs
    }
}