import { db } from "../../config/firestore"
import { BaseModel } from "../base.model"

export class Event extends BaseModel {

    constructor() {
        super(db.collection('events'))
    }

}