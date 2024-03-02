import { db } from "../../config/firebaseConfig"
import { COLLECTION } from "../../data/default-collection-name";
import { BaseModel } from "../base.model";

export class EventService extends BaseModel {

    constructor() {
        super(db.collection(COLLECTION.eventService))
    }

}