import { User } from "../models/user/user.model";

export type T_NotifType = 'create' | 'update' | 'delete'

export class NotifService {

    userModel: User

    constructor() {
        this.userModel = new User()
    }

    dispatchNotif(type: T_NotifType, collection: string) {}
}