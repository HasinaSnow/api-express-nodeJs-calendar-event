import { db } from "../../config/firebaseConfig"
import { COLLECTION } from "../../data/default-collection-name"
import { BaseModel } from "../base.model"

export interface IFilterEvent {
    date?: number,
    month?: number,
    year?: number,
    categId?: string,
    clientId?: string
}

export class Event extends BaseModel {

    constructor() {
        super(db.collection(COLLECTION.event))
    }

    /**
     * retrieve all events for the id services and month limit specified
     * @param serviceRefs {string[]}
     * @param limitMonth {number}
     */
    getByServices(limitMonth: number, servicesRefs: string[]) {
        const now = new Date()
        const currentMonth = now.getMonth()
        const in12NextMonth = new Date().setMonth(currentMonth + limitMonth)
        const startCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const end12NextMonth = new Date(new Date(in12NextMonth).setMonth(new Date(in12NextMonth).getMonth() + 1, 0))
        let collection = this.collection
            .where('date', '>=', startCurrentMonth)
            .where('date', '<=', end12NextMonth)
        if(servicesRefs.length > 0)
            collection = collection.where('serviceRefs', 'array-contains-any', servicesRefs)
        return collection.get()
    }

    /**
     * get all service id by the specified event id
     * @param string eventId
     * @returns Promise<string[]>
     */
    async getServiceRefs(eventId: string) {
        return (await db.collection(COLLECTION.eventService).where('eventId', '==', eventId).get())
            .docs.map(doc => doc.get('serviceId') as string)
    }

    /**
     * filter all the documents by the specified fileter params
     * @param docs 
     * @param filter 
     * @returns 
     */
    getfilterEvent(docs: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[], filter: IFilterEvent) {
        if(filter.date)
            docs = docs.filter(doc => new Date(doc.get('date')).getDate() == filter.date)
        if(filter.month)
            docs = docs.filter(doc => new Date(doc.get('date')).getMonth() == filter.month)
        if(filter.year)
            docs = docs.filter(doc => new Date(doc.get('date')).getFullYear() == filter.year)
        if(filter.categId)
            docs = docs.filter(doc => doc.get('categId') == filter.categId)
        if(filter.clientId)
            docs = docs.filter(doc => doc.get('clientId') == filter.clientId)
        return docs
    }

}