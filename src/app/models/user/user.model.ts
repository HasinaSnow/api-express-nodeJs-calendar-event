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
        return (await this.collection.doc(userId).get())
            .get('serviceRefs')
    }

    /**
     * get all user id by specified services
     * @param string[] serviceRefs
     * @returns Promise<string[]>
     */
    async getUserRefsByServices(serviceRefs: string[]) {
        return (await this.collection
            .where('serviceRefs', 'array-contains-any', serviceRefs)
            .get()).docs.map(doc => doc.id)
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