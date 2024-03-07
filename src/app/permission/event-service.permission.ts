import { Request } from "express";
import { BasePermission } from "./base.permission";
import { ROLE_NAME } from "../data/default-role-name.data";
import { EventService } from "../models/event-service/event-service.model";

export class EventServicePermission extends BasePermission {

    constructor(req: Request) {
        super(req, ROLE_NAME.eventServiceManager, new EventService())
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