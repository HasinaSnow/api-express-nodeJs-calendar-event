import { ILogin, IRegister } from "./account.interface";
import { getAuth, sendEmailVerification, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth as authAdmin } from '../../config/firestore'

export class AccountModel {

    constructor(private auth = getAuth()) {
        this.auth.languageCode = 'fr'
    }

    register(newData: IRegister) {
        return createUserWithEmailAndPassword(this.auth, newData.email, newData.password)
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

    currentUser() {
        return this.auth.currentUser
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

}