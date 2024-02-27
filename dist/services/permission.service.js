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
exports.PermissionService = void 0;
const firestore_1 = require("../config/firestore");
const role_model_1 = require("../models/role/role.model");
const role_user_model_1 = require("../models/role-user/role-user.model");
const default_role_name_data_1 = require("../data/default-role-name.data");
class PermissionService {
    constructor(req, model) {
        this.req = req;
        this.model = model;
        this.roleModel = new role_model_1.Role();
        this.roleUserModel = new role_user_model_1.RoleUser();
        this.setCurrentUserId(req);
    }
    setCurrentUserId(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const authToken = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            return firestore_1.auth.verifyIdToken(authToken)
                .then(user => this.userId = user.uid)
                .catch(_ => { throw Error('userId not found'); });
        });
    }
    isAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const roleId = yield this.roleModel.getIdByName(default_role_name_data_1.ROLE_NAME.admin);
            return !(yield this.roleUserModel.getRoleRef(roleId)).empty;
        });
    }
    isPermis(roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleId = yield this.roleModel.getIdByName(roleName);
            return !(yield this.roleUserModel.getRoleRef(roleId)).empty;
        });
    }
    isSuper(roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleId = yield this.roleModel.getIdByName(roleName);
            return !(yield this.roleUserModel.getRoleRefSuper(roleId)).empty;
        });
    }
    isAuthor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.isCreatedBy(id, this.userId);
        });
    }
}
exports.PermissionService = PermissionService;
