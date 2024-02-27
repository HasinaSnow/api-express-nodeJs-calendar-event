import { db } from "../../config/firestore"
import { COLLECTION } from "../../data/default-collection-name";
import { BaseModel } from "../base.model";

export class RoleUser extends BaseModel {

    constructor() {
        super(db.collection(COLLECTION.roleUser))
    }

    async getRoleRef(roleId: string) {
        return this.collection
            .where('roleId', '==', roleId).get()
    }

    async getRoleRefSuper(roleId: string) {
        return this.collection
            .where('roleId', '==', roleId)
            .where('isSuper', '==', true)
            .get()
    }
}