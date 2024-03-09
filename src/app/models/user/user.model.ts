import { db } from "../../config/firebaseConfig"
import { COLLECTION } from "../../data/default-collection-name";
import { BaseModel } from "../base.model";

export class User extends BaseModel {

    constructor() {
        super(db.collection(COLLECTION.user))
    }

    /**
     * store a new user document in the collection
     * @param object newData 
     * @param string uid 
     * @returns Promise<FirebaseFirestore.WriteResult>
     */
    registerNewUser(newData: any, uid: string) {
        return this.collection.doc(uid).set(newData)
    }

    /**
     * get all service Id by the specified userId
     * @param string userId
     * @returns Promise<string[]>
     */
    async getServiceRefs(userId: string) {
        return (await db.collection(COLLECTION.user).doc(userId).get())
            .get('serviceRefs') as string[]
    }

    /**
     * get all role Id by the specified userId
     * @param string userId 
     * @returns Promise<string[]>
     */
    async getRoleRefs(userId: string) {
        return (await db.collection(COLLECTION.roleUser).where('userId', '==', userId).get())
            .docs.map(doc => doc.get('roleId'))
    }

}