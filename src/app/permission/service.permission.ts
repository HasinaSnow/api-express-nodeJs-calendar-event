import { Request } from "express";
import { BasePermission } from "./base.permission";
import { ROLE_NAME } from "../data/default-role-name.data";
import { Service } from "../models/service/service.model";

export class ServicePermission extends BasePermission {

    constructor(req: Request) {
        super(req, ROLE_NAME.serviceManager, new Service())
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