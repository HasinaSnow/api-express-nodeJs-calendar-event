import { auth, db } from "../../config/firestore";
import { Subscriber } from "../subscriber/subscriber.model";
import { ISignup } from "./account.interface";

export class AccountModel {

    async register(newData: ISignup) {
        return await auth.createUser(newData)
    }

    async subsriberVerified(data: ISignup) {
        let result: any
        if(data.email) {
            result = await db.collection('subscribers').where('email', '==', data.email).get()
        } else if(data.phone){
            result = await db.collection('subscribers').where('phone', '==', data.phone).get()
        }
        return !result.empty
    }

    async block() {
        // return await auth
    }

}