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
exports.RoleUserPermission = void 0;
const base_permission_1 = require("./base.permission");
const role_user_model_1 = require("../models/role-user/role-user.model");
const default_role_name_data_1 = require("../data/default-role-name.data");
class RoleUserPermission extends base_permission_1.BasePermission {
    constructor(req) {
        super(req, default_role_name_data_1.ROLE_NAME.roleUserManager, new role_user_model_1.RoleUser());
    }
    toStore() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.userCurrent.isAdmin())
                if (yield this.userCurrent.isSuper(default_role_name_data_1.ROLE_NAME.admin))
                    return true;
            return false;
        });
    }
    toAttribute() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classicPermission();
        });
    }
    toViewIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    toShow(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classicPermission();
        });
    }
    toUpdate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.userCurrent.isAdmin())
                if (yield this.userCurrent.isSuper(default_role_name_data_1.ROLE_NAME.admin))
                    return true;
            return false;
        });
    }
    toUpdateAttribute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.privatePermission(id);
        });
    }
    toDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.privatePermission(id);
        });
    }
}
exports.RoleUserPermission = RoleUserPermission;
