import { db } from "../../config/firebaseConfig"
import { COLLECTION } from "../../data/default-collection-name";
import { BaseModel } from "../base.model";

export class Service extends BaseModel {

    constructor() {
        super(db.collection(COLLECTION.service))
    }

    /**
     * get all user Id by the specified serviceId
     * @param string serviceId
     * @returns Promise<string[]>
     */
    async getUserRefs(serviceId: string): Promise<string[]> {
        return (await db.collection(COLLECTION.user).where('serviceRefs', 'array-contains', serviceId).get())
            .docs.map(doc => doc.id as string)
    }

    /**
     * get all event Id by the specified serviceId
     * @param string serviceId 
     * @returns Promise<string[]>
     */
    async getEventRefs(serviceId: string) {
        return (await db.collection(COLLECTION.event).where('serviceRefs', 'array-contains', serviceId).get())
            .docs.map(doc => doc.id as string)
    }

}