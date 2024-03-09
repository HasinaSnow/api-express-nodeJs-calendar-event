"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const auth_1 = require("firebase/auth");
const firebaseConfig_1 = require("../../config/firebaseConfig");
const user_model_1 = require("../user/user.model");
const subscriber_model_1 = require("../subscriber/subscriber.model");
class Account {
    constructor(auth = (0, auth_1.getAuth)()) {
        this.auth = auth;
        this.auth.languageCode = 'fr';
    }
    register(newData) {
        return (0, auth_1.createUserWithEmailAndPassword)(this.auth, newData.email, newData.password);
    }
    storeDisplayName(id, name) {
        return firebaseConfig_1.auth.updateUser(id, { displayName: name });
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
    getUser(uid) {
        return new user_model_1.User().getOne(uid);
    }
    createUser(creds) {
        return __awaiter(this, void 0, void 0, function* () {
            // get serviceRefs predicted in subscriber's collection
            const serviceRefs = (yield new subscriber_model_1.Subscriber().getByEmail(creds.user.email)).docs[0].get('serviceRefs');
            yield new user_model_1.User().registerNewUser({
                name: creds.user.displayName,
                email: creds.user.email,
                serviceRefs: serviceRefs,
                createdAt: new Date(),
                updatedAt: null,
                createdBy: creds.user.uid,
                updatedBy: null
            }, creds.user.uid);
        });
    }
}
exports.Account = Account;
