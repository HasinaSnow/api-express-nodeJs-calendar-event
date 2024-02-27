import { Request } from "express";
import { BasePermission } from "./base.permission";
import { Event } from "../models/event/event.model";

export class EventPermission extends BasePermission {

    constructor(req: Request) {
        super(req, 'EVENT MANAGER', new Event())
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