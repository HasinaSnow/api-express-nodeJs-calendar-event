import { db } from "../../config/firestore"
import { COLLECTION } from "../../data/default-collection-name";
import { BaseModel } from "../base.model";

export class Service extends BaseModel {

    constructor() {
        super(db.collection(COLLECTION.service))
    }
}