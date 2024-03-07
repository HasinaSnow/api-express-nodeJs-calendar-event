import { db } from "../../config/firebaseConfig"
import { COLLECTION } from "../../data/default-collection-name";
import { BaseModel } from "../base.model";

export class User extends BaseModel {

    constructor() {
        super(db.collection(COLLECTION.user))
    }

    async userIdExists(userRef: string) {
        return await this.collection.where('userRef', '==', userRef).get()
            .then(user => !user.empty)
            .catch(() => { throw Error('Error in Database users collection useref.') })
    }

    async getServiceRefs(userId: string) {
        return (await db.collection(COLLECTION.serviceUser).where('userId', '==', userId).get())
            .docs.map(doc => doc.get('serviceId') as string)
    }

}