import { ILogin, IRegister } from "./account.interface";
import { getAuth, sendEmailVerification, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth as authAdmin } from '../../config/firebaseConfig'
import { User as UserModel} from "../user/user.model";
import { Subscriber } from "../subscriber/subscriber.model";

export class Account {

    constructor(private auth = getAuth()) {
        this.auth.languageCode = 'fr'
    }

    register(newData: IRegister) {
        return createUserWithEmailAndPassword(this.auth, newData.email, newData.password)
    }

    storeDisplayName(id: string, name: string) {
        return authAdmin.updateUser(id, { displayName: name })
    }

    login(newData: ILogin) {
        return signInWithEmailAndPassword(this.auth, newData.email, newData.password)
    }

    logout(userId: string) {
        return authAdmin.revokeRefreshTokens(userId)
    }

    getUserByEmail(email: string) {
        return authAdmin.getUserByEmail(email)
    }

    generateToken(userId: string) {
        return authAdmin.createCustomToken(userId)
    }

    verifyToken(token: string) {
        return authAdmin.verifyIdToken(token)
    }

    sendEmailConfirmation(user: User) {
        return sendEmailVerification(user)
    }

    getUser(uid: string) {
        return  new UserModel().getOne(uid)
    }

    async createUser(creds: UserCredential) {
        // get serviceRefs predicted in subscriber's collection
        const serviceRefs: string[] = (await new Subscriber().getByEmail(creds.user.email as string)).docs[0].get('serviceRefs')
        await new UserModel().registerNewUser({ 
            name: creds.user.displayName, 
            email: creds.user.email ,
            serviceRefs: serviceRefs,
            createdAt: new Date(),
            updatedAt: null,
            createdBy: creds.user.uid,
            updatedBy: null
        }, creds.user.uid)
    }

}