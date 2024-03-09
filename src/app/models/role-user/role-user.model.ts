import { db } from "../../config/firebaseConfig"
import { COLLECTION } from "../../data/default-collection-name";
import { ROLE_NAME } from "../../data/default-role-name.data";
import { BaseModel } from "../base.model";
import { Role } from "../role/role.model";

export class RoleUser extends BaseModel {

    constructor( private roleModel: Role = new Role()) {
        super(db.collection(COLLECTION.roleUser))
    }

    async getRoleRefs(roleId: string, userId: string) {
        return this.collection
            .where('roleId', '==', roleId)
            .where('userId', '==', userId)
            .get()
    }

    async getRoleRefsSuper(roleId: string, userId: string) {
        return this.collection
            .where('roleId', '==', roleId)
            .where('userId', '==', userId)
            .where('isSuper', '==', true)
            .get()
    }

    async isAdminId(id: string) {
        const adminId = await this.roleModel.getIdByName(ROLE_NAME.admin)
        return id == adminId
    }

    async isRoleUserManagerId(id: string) {
        const roleUserManagerId = await this.roleModel.getIdByName(ROLE_NAME.roleUserManager)
        return id == roleUserManagerId
    }

    async isRoleManagerId(id: string) {
        const roleManagerId = await this.roleModel.getIdByName(ROLE_NAME.roleManager)
        return id == roleManagerId
    }

}