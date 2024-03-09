import { Request } from "express";
import { BasePermission } from "./base.permission";
import { RoleUser } from "../models/role-user/role-user.model";
import { ROLE_NAME } from "../data/default-role-name.data";

export class RoleUserPermission extends BasePermission {

    constructor(req: Request) {
        super(req, ROLE_NAME.roleUserManager, new RoleUser())
    }

    async toStore(): Promise<Boolean> {
        if (await this.userCurrent.isAdmin())
            if(await this.userCurrent.isSuper(ROLE_NAME.admin))
                return true
        return false
    }

    async toAttribute(): Promise<Boolean> {
        return this.classicPermission()
    }

    async toViewIndex(): Promise<Boolean> {
        return true
    }

    async toShow(id: string): Promise<Boolean> {
        return this.classicPermission()
    }

    async toUpdate(id: string): Promise<Boolean> {
        if (await this.userCurrent.isAdmin())
            if(await this.userCurrent.isSuper(ROLE_NAME.admin))
                return true
        return false
    }

    async toUpdateAttribute(id: string): Promise<Boolean> {
        return this.privatePermission(id)
    }

    async toDelete(id: string): Promise<Boolean> {
        return this.privatePermission(id)
    }
}