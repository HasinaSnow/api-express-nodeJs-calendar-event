import { db } from "../../config/firebaseConfig";
import { COLLECTION } from "../../data/default-collection-name";
import { ROLE_NAME } from "../../data/default-role-name.data";
import { BaseModel } from "../base.model";

export class Role extends BaseModel {
    constructor() {
        super(db.collection(COLLECTION.role))
    }

    async getIdByName(roleName: string) {
        return await this.collection.where('name', '==', roleName).get()
            .then(role => {
                return role.docs[0].id
            })
    }

}