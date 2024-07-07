"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const firebaseConfig_1 = require("../../config/firebaseConfig");
const default_collection_name_1 = require("../../data/default-collection-name");
const base_model_1 = require("../base.model");
class Event extends base_model_1.BaseModel {
    constructor() {
        super(firebaseConfig_1.db.collection(default_collection_name_1.COLLECTION.event));
    }
    /**
     * retrieve all events for the id services and month limit specified
     * @param serviceRefs {string[]}
     * @param limitMonth {number}
     */
    getByServices(limitMonth, servicesRefs) {
        const now = new Date();
        const currentMonth = now.getMonth();
        const in12NextMonth = new Date().setMonth(currentMonth + limitMonth);
        const startCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const end12NextMonth = new Date(new Date(in12NextMonth).setMonth(new Date(in12NextMonth).getMonth() + 1, 0));
        let collection = this.collection
            .where('date', '>=', startCurrentMonth)
            .where('date', '<=', end12NextMonth);
        if (servicesRefs.length > 0)
            collection = collection.where('serviceRefs', 'array-contains-any', servicesRefs);
        return collection.get();
    }
    /**
     * get all service id by the specified event id
     * @param string eventId
     * @returns Promise<string[]>
     */
    getServiceRefs(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield firebaseConfig_1.db.collection(default_collection_name_1.COLLECTION.eventService).where('eventId', '==', eventId).get())
                .docs.map(doc => doc.get('serviceId'));
        });
    }
    /**
     * filter all the documents by the specified fileter params
     * @param docs
     * @param filter
     * @returns
     */
    getfilterEvent(docs, filter) {
        if (filter.date)
            docs = docs.filter(doc => new Date(doc.get('date')).getDate() == filter.date);
        if (filter.month)
            docs = docs.filter(doc => new Date(doc.get('date')).getMonth() == filter.month);
        if (filter.year)
            docs = docs.filter(doc => new Date(doc.get('date')).getFullYear() == filter.year);
        if (filter.categId)
            docs = docs.filter(doc => doc.get('categId') == filter.categId);
        if (filter.clientId)
            docs = docs.filter(doc => doc.get('clientId') == filter.clientId);
        return docs;
    }
}
exports.Event = Event;
