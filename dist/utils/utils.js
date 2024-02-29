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
exports.getUidToken = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
/**
 * decode the token in request and get the uid
 * @param req Request
 * @returns Promise<string>
 */
const getUidToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authToken = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    return firebaseConfig_1.auth.verifyIdToken(authToken)
        .then(user => user.uid)
        .catch(_ => '');
});
exports.getUidToken = getUidToken;
