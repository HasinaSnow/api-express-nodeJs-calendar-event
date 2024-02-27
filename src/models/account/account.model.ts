import { ILogin, IRegister } from "./account.interface";
import { getAuth, sendEmailVerification, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth as authAdmin } from '../../config/firestore'
import { User as UserModel } from "../user/user.model";
import { IUser } from "../user/user.interface";

export class Account {

    private userModel: UserModel

    constructor(private auth = getAuth()) {
        this.auth.languageCode = 'fr'
        this.userModel = new UserModel()
    }

    register(newData: IRegister) {
        return createUserWithEmailAndPassword(this.auth, newData.email, newData.password)
    }

    storeDisplayName(id: string, newData: IRegister) {
        return authAdmin.updateUser(id, { displayName: newData.name,  })
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

    haveAccount(userRef: string) {
        return this.userModel.userIdExists(userRef)
    }

    createAccount(userRef: string, name: string) {
        return this.userModel.create({ name: name, userRef: userRef, infos: ''} as IUser)
    }

}