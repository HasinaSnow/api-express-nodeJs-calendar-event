import { db } from "../../config/firebaseConfig"
import { COLLECTION } from "../../data/default-collection-name";
import { ROLE_NAME } from "../../data/default-role-name.data";
import { BaseModel } from "../base.model";
import { Role } from "../role/role.model";

export class RoleUser extends BaseModel {

    constructor( private roleModel: Role = new Role()) {
        super(db.collection(COLLECTION.roleUser))
    }

    /**
     * get roleUser
     * @param string roleId
     * @param string userId
     * @return Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>
     */
    async getRoleUser(roleId: string, userId: string) {
        return this.collection
            .where('roleId', '==', roleId)
            .where('userId', '==', userId)
            .get()
    }

    /**
     * get roleUser where super is true
     * @param string roleId
     * @param string userId
     * @return Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>
     */
    async getRoleUserSuper(roleId: string, userId: string) {
        return this.collection
            .where('roleId', '==', roleId)
            .where('userId', '==', userId)
            .where('isSuper', '==', true)
            .get()
    }

    /**
     * get all role id by users
     * @param string[] userRefs
     * @returns Promise<string[]>
     */
    async getRoleRefsByUsers(userRefs: string[]) {
        return (await this.collection
            .where('userId', 'in', userRefs)
            .get()).docs.map(doc => doc.id)
    }

    /**
     * get all user id by roles
     * @param string[] roleRefs
     * @returns Promise<string[]>
     */
    async getUserRefsByRoles(roleRefs: string[]) {
        return (await this.collection
            .where('roleId', 'in', roleRefs)
            .get()).docs.map(doc => doc.get('userId') as string)
    }

}