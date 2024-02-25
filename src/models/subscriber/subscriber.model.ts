import { db } from "../../config/firestore";
import { BaseModel } from "../base.model";

export class Subscriber extends BaseModel {

    constructor() {
        super(db.collection('subscribers'))
    }
}