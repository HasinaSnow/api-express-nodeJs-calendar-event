import { Request } from "express";
import { BaseModel } from "../models/base.model";
import { Role } from "../models/role/role.model";
import { RoleUser } from "../models/role-user/role-user.model";
import { ROLE_NAME } from "../data/default-role-name.data";
import { getUidTokenInRequest } from "../utils/utils";

export class PermissionService {

    roleModel: Role
    roleUserModel: RoleUser
    userId: Promise<string> = getUidTokenInRequest(this.req)

    constructor(protected req: Request, protected model: BaseModel) {
        this.roleModel = new Role()
        this.roleUserModel = new RoleUser()
    }

    async isAdmin() {
        const roleAdminId = await this.roleModel.getIdByName(ROLE_NAME.admin)
        return !(await this.roleUserModel.getRoleUser(roleAdminId, await this.userId)).empty
    }

    async isPermis(roleName: string) {
        const roleId = await this.roleModel.getIdByName(roleName)
        return !(await this.roleUserModel.getRoleUser(roleId, await this.userId)).empty
    }

    async isSuper(roleName: string) {
        const roleId = await this.roleModel.getIdByName(roleName)
        return !(await this.roleUserModel.getRoleUserSuper(roleId, await this.userId)).empty
    }

    async isAuthor(id: string) {
        return await this.model.isCreatedBy(id, await this.userId)
    }

}