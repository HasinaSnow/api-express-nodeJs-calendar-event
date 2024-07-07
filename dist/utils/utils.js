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
exports.getUidToken = exports.getUidTokenInRequest = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
/**
 * get the unique id of user into the token in request
 * @param req Request
 * @returns Promise<string>
 */
const getUidTokenInRequest = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authToken = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    return firebaseConfig_1.auth.verifyIdToken(authToken)
        .then(user => user.uid)
        .catch(error => { throw new Error(error.message); });
});
exports.getUidTokenInRequest = getUidTokenInRequest;
/**
 * get the unique id of user into the token
 */
const getUidToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const isBearerToken = token.split(' ').length >= 2;
    if (isBearerToken) {
        console.log('__is bearer__');
        token = token.split(' ')[1];
    }
    return firebaseConfig_1.auth.verifyIdToken(token)
        .then(user => user.uid)
        .catch(error => { throw new Error(error.message); });
});
exports.getUidToken = getUidToken;
