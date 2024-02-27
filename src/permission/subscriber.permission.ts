import { Request } from "express";
import { BasePermission } from "./base.permission";
import { Subscriber } from "../models/subscriber/subscriber.model";
import { ROLE_NAME } from "../data/default-role-name.data";

export class SubscriberPermission extends BasePermission {

    constructor(req: Request) {
        super(req, ROLE_NAME.subscriberManager, new Subscriber())
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