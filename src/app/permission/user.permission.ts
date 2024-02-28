import { Request } from "express";
import { BasePermission } from "./base.permission";
import { User } from "../models/user/user.model";
import { ROLE_NAME } from "../data/default-role-name.data";

export class UserPermission extends BasePermission {

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
        return this.protectedPermission(id)
    }
}