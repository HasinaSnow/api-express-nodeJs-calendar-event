import { db } from "../../config/firebaseConfig";
import { COLLECTION } from "../../data/default-collection-name";
import { BaseModel } from "../base.model";

export class Subscriber extends BaseModel {

    constructor() {
        super(db.collection(COLLECTION.subscriber))
    }

    getByEmail(email: string) {
        return this.collection.where('email', '==', email).get()
    }
}