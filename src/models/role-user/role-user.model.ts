import { db } from "../../config/firestore"
import { BaseModel } from "../base.model";

export class RoleUser extends BaseModel {

    constructor() {
        super(db.collection('role_users'))
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