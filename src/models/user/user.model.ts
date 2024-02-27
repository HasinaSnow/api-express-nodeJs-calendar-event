import { db } from "../../config/firestore"
import { BaseModel } from "../base.model";

export class User extends BaseModel {

    constructor() {
        super(db.collection('users'))
    }

    async userIdExists(userRef: string) {
        return await this.collection.where('userRef', '==', userRef).get()
            .then(user => !user.empty)
            .catch(() => { throw Error('Error in Database users collection useref.') })
    }

}