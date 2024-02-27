import { Request } from "express";
import { BasePermission } from "./base.permission";
import { Categ } from "../models/categ/categ.model";
import { ROLE_NAME } from "../data/default-role-name.data";

export class CategPermission extends BasePermission {

    constructor(req: Request) {
        super(req, ROLE_NAME.categManager, new Categ())
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