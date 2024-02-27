import { Request } from "express";
import { BasePermission } from "./base.permission";
import { Subscriber } from "../models/subscriber/subscriber.model";

export class SubscriberPermission extends BasePermission {

    constructor(req: Request) {
        super(req, 'SUBSCRIBER MANAGER', new Subscriber())
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