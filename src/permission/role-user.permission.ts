import { Request } from "express";
import { BasePermission } from "./base.permission";
import { RoleUser } from "../models/role-user/role-user.model";

export class RoleUserPermission extends BasePermission {

    constructor(req: Request) {
        super(req, 'ROLE_USER MANAGER', new RoleUser())
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
        return this.privatePermission(id)
    }

    async toDelete(id: string): Promise<Boolean> {
        return this.privatePermission(id)
    }
}