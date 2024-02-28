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
exports.AccountController = void 0;
const class_validator_1 = require("class-validator");
const response_1 = require("../utils/response");
const account_model_1 = require("../models/account/account.model");
const default_collection_name_1 = require("../data/default-collection-name");
const user_model_1 = require("../models/user/user.model");
const login_validator_1 = require("../models/account/login.validator");
const register_validator_1 = require("../models/account/register.validator");
class AccountController {
    constructor(req, res, model = new account_model_1.Account(), response = new response_1.ResponseService(res, default_collection_name_1.SUBJECT.account)) {
        this.req = req;
        this.res = res;
        this.model = model;
        this.response = response;
    }
    signup() {
        return __awaiter(this, void 0, void 0, function* () {
            // verify input validation and subsrciber account
            if (yield this.registerValid()) {
                // create the user and send confirmation key
                this.model
                    .register(this.dataSignUp)
                    .then((userCredential) => {
                    this.model.storeDisplayName(userCredential.user.uid, this.dataSignUp)
                        .then(userRecord => {
                        this.model.sendEmailConfirmation(userCredential.user)
                            .then((value) => {
                            const data = { name: userRecord.displayName, email: userRecord.email, userRef: userRecord.uid };
                            new user_model_1.User().create(data)
                                .then(_ => this.response.sendingConfirmationKey(value, "email"));
                        });
                    });
                })
                    .catch((error) => this.response.errorServer(error.message));
            }
        });
    }
    signin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.loginValid()) {
                // get user
                this.model.login(this.dataLogin)
                    .then((creds) => __awaiter(this, void 0, void 0, function* () {
                    // verify emailVerified
                    if (!creds.user.emailVerified)
                        return this.response.emailNotVerified();
                    console.log('___displayName___', yield this.haveAccount(creds.user.uid));
                    // verify account user
                    if (!(yield this.haveAccount(creds.user.uid)))
                        this.createAccount(creds.user.uid, creds.user.displayName)
                            .catch(error => this.response.errorServer(error));
                    // generate token
                    this.model.generateToken(creds.user.uid);
                    creds.user.getIdToken()
                        .then(token => this.response.successlogin(token));
                }))
                    .catch((error) => {
                    switch (error.code) {
                        case "auth/invalid-credential":
                            this.response.invalidRequest('The email or password is invalid.');
                            break;
                        default:
                            this.response.errorServer(error);
                            break;
                    }
                });
            }
        });
    }
    signout() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const token = (_a = this.req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token)
                return this.response.invalidRequest();
            this.model.verifyToken(token)
                .then(value => {
                this.model.logout(value.uid)
                    .then(_ => this.response.successLogout());
            })
                .catch(error => this.response.invalidRequest());
        });
    }
    loginValid() {
        return __awaiter(this, void 0, void 0, function* () {
            const validator = new login_validator_1.LoginValidator();
            this.dataLogin = validator.init(this.req.body);
            return (0, class_validator_1.validate)(validator).then((errors) => {
                if (errors.length > 0) {
                    this.response.errorValidation(errors);
                    return false;
                }
                return true;
            });
        });
    }
    registerValid() {
        return __awaiter(this, void 0, void 0, function* () {
            // validate the inputs
            const validator = new register_validator_1.RegisterValidator();
            this.dataSignUp = validator.init(this.req.body);
            return (0, class_validator_1.validate)(validator).then((errors) => {
                if (errors.length > 0) {
                    this.response.errorValidation(errors);
                    return false;
                }
                return true;
            });
        });
    }
    haveAccount(userRef) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.haveAccount(userRef);
        });
    }
    createAccount(userRef, name) {
        return this.model.createAccount(userRef, name);
    }
}
exports.AccountController = AccountController;
