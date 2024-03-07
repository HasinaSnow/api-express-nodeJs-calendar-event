import { db } from "../../config/firebaseConfig"
import { COLLECTION } from "../../data/default-collection-name";
import { BaseModel } from "../base.model";

export class Service extends BaseModel {

    constructor() {
        super(db.collection(COLLECTION.service))
    }

    async getUserRefs(serviceId: string) {
        return (await db.collection(COLLECTION.serviceUser).where('serviceId', '==', serviceId).get())
            .docs.map(doc => doc.get('userId') as string)
    }

    async getEventRefs(serviceId: string) {
        return (await db.collection(COLLECTION.eventService).where('serviceId', '==', serviceId).get())
            .docs.map(doc => doc.get('eventId') as string)
    }
}