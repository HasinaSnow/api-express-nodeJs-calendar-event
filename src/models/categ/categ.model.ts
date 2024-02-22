import { db } from "../../config/firestore"
import { BaseModel } from "../base.model";

export class Categ extends BaseModel {

    constructor() {
        super(db.collection('categs'))
    }
}