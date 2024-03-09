import { Request } from "express";
import { BaseModel } from "../models/base.model";
import { Role } from "../models/role/role.model";
import { RoleUser } from "../models/role-user/role-user.model";
import { ROLE_NAME } from "../data/default-role-name.data";
import { getUidToken } from "../utils/utils";

export class PermissionService {

    roleModel: Role
    roleUserModel: RoleUser
    userId: string

    constructor(protected req: Request, protected model: BaseModel) {
        this.roleModel = new Role()
        this.roleUserModel = new RoleUser()
        this.setCurrentUserId(req)
    }

    private async setCurrentUserId(req: Request) {
        this.userId = await getUidToken(req)
    }

    async isAdmin() {
        const roleAdminId = await this.roleModel.getIdByName(ROLE_NAME.admin)
        return !(await this.roleUserModel.getRoleRefs(roleAdminId, this.userId)).empty
    }

    async isPermis(roleName: string) {
        const roleId = await this.roleModel.getIdByName(roleName)
        return !(await this.roleUserModel.getRoleRefs(roleId, this.userId)).empty
    }

    async isSuper(roleName: string) {
        const roleId = await this.roleModel.getIdByName(roleName)
        return !(await this.roleUserModel.getRoleRefsSuper(roleId, this.userId)).empty
    }

    async isAuthor(id: string) {
        return await this.model.isCreatedBy(id, this.userId)
    }

}