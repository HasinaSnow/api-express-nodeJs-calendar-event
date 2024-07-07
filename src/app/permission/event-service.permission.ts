import { Request } from "express";
import { BasePermission } from "./base.permission";
import { ROLE_NAME } from "../data/default-role-name.data";
import { Event } from "../models/event/event.model";

export class EventServicePermission extends BasePermission {

    constructor(req: Request) {
        super(req, ROLE_NAME.eventManager, new Event())
    }

    async toStore(): Promise<Boolean> {
        return this.classicPermission()
    }

    async toViewIndex(): Promise<Boolean> {
        return this.classicPermission()
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