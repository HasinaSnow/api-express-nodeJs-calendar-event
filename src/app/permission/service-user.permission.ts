import { Request } from "express";
import { BasePermission } from "./base.permission";
import { ROLE_NAME } from "../data/default-role-name.data";
import { User } from "../models/user/user.model";

export class ServiceUserPermission extends BasePermission {

    constructor(req: Request) {
        super(req, ROLE_NAME.userManager, new User())
    }

    async toStore(): Promise<Boolean> {
        return this.classicPermission()
    }

    async toViewIndex(): Promise<Boolean> {
        return true
    }

    async toShow(id: string): Promise<Boolean> {
        return this.classicPermission()
    }

    async toUpdate(id: string): Promise<Boolean> {
        return this.protectedPermission(id)
    }

    async toDelete(id: string): Promise<Boolean> {
        return this.privatePermission(id)
    }
}