"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const auth_1 = require("firebase/auth");
const firebaseConfig_1 = require("../../config/firebaseConfig");
const user_model_1 = require("../user/user.model");
class Account {
    constructor(auth = (0, auth_1.getAuth)()) {
        this.auth = auth;
        this.auth.languageCode = 'fr';
        this.userModel = new user_model_1.User();
    }
    register(newData) {
        return (0, auth_1.createUserWithEmailAndPassword)(this.auth, newData.email, newData.password);
    }
    storeDisplayName(id, newData) {
        return firebaseConfig_1.auth.updateUser(id, { displayName: newData.name, });
    }
    login(newData) {
        return (0, auth_1.signInWithEmailAndPassword)(this.auth, newData.email, newData.password);
    }
    logout(userId) {
        return firebaseConfig_1.auth.revokeRefreshTokens(userId);
    }
    getUserByEmail(email) {
        return firebaseConfig_1.auth.getUserByEmail(email);
    }
    generateToken(userId) {
        return firebaseConfig_1.auth.createCustomToken(userId);
    }
    verifyToken(token) {
        return firebaseConfig_1.auth.verifyIdToken(token);
    }
    sendEmailConfirmation(user) {
        return (0, auth_1.sendEmailVerification)(user);
    }
    haveAccount(userRef) {
        return this.userModel.userIdExists(userRef);
    }
    createAccount(userRef, name) {
        return this.userModel.create({ name: name, userRef: userRef, infos: '' });
    }
}
exports.Account = Account;
