import { db } from "../../config/firebaseConfig"
import { COLLECTION } from "../../data/default-collection-name";
import { BaseModel } from "../base.model";

export class ServiceUser extends BaseModel {

    constructor() {
        super(db.collection(COLLECTION.serviceUser))
    }

}