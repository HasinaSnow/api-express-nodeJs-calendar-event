import { Request } from "express";
import { BasePermission } from "./base.permission";
import { Role } from "../models/role/role.model";
import { ROLE_NAME } from "../data/default-role-name.data";

export class RolePermission extends BasePermission {

    constructor(req: Request) {
        super(req, ROLE_NAME.roleManager, new Role())
    }

    async toStore(): Promise<Boolean> {
        return await this.superPermission()
    }

    async toViewIndex(): Promise<Boolean> {
        return true
    }

    async toShow(id: string): Promise<Boolean> {
        return this.classicPermission()
    }

    async toUpdate(id: string): Promise<Boolean> {
        return this.superPermission()
    }

    async toDelete(id: string): Promise<Boolean> {
        return this.superPermission()
    }
}