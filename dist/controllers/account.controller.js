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
            yield this.validate(new register_validator_1.RegisterValidator());
            const registerData = this.requestValidated;
            // register
            this.model.register(registerData)
                .then((creds) => __awaiter(this, void 0, void 0, function* () {
                // save name user
                yield this.model.storeDisplayName(creds.user.uid, registerData.name);
                // send email confirmation
                yield this.model.sendEmailConfirmation(creds.user);
                // return suceess response
                return this.response.sendingConfirmationKey([], "email");
            }))
                .catch((error) => this.response.errorServer(error));
        });
    }
    signin() {
        return __awaiter(this, void 0, void 0, function* () {
            // verify validation
            yield this.validate(new login_validator_1.LoginValidator());
            const loginData = this.requestValidated;
            // login
            this.model.login(loginData)
                .then((creds) => __awaiter(this, void 0, void 0, function* () {
                // verify email
                if (!creds.user.emailVerified)
                    return this.response.emailNotVerified();
                // verifie if the user account exists
                if (!(yield this.model.getUser(creds.user.uid)).exists) {
                    // create user for this account
                    try {
                        yield this.model.createUser(creds);
                    }
                    catch (error) {
                        return this.response.errorServer(error);
                    }
                }
                // send a success response signin with token JWT
                return creds.user.getIdToken()
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
                .catch(_ => this.response.invalidRequest());
        });
    }
    validate(validationType) {
        return __awaiter(this, void 0, void 0, function* () {
            this.requestValidated = validationType.init(this.req.body);
            const errors = yield (0, class_validator_1.validate)(validationType);
            if (errors.length > 0)
                return this.response.errorValidation(errors);
        });
    }
}
exports.AccountController = AccountController;
