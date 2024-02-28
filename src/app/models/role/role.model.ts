import { db } from "../../config/firestore";
import { COLLECTION } from "../../data/default-collection-name";
import { BaseModel } from "../base.model";

export class Role extends BaseModel {
    constructor() {
        super(db.collection(COLLECTION.role))
    }

    async getIdByName(roleName: string) {
        return await this.collection.where('name', '==', roleName).get()
            .then(role => {
                console.log('__role empty__', role.empty)
                return role.docs[0].id})
            // .catch(error => { th})s
    }

}