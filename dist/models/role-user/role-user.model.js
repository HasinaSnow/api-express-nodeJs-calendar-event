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
exports.RoleUser = void 0;
const firebaseConfig_1 = require("../../config/firebaseConfig");
const default_collection_name_1 = require("../../data/default-collection-name");
const default_role_name_data_1 = require("../../data/default-role-name.data");
const base_model_1 = require("../base.model");
const role_model_1 = require("../role/role.model");
class RoleUser extends base_model_1.BaseModel {
    constructor(roleModel = new role_model_1.Role()) {
        super(firebaseConfig_1.db.collection(default_collection_name_1.COLLECTION.roleUser));
        this.roleModel = roleModel;
    }
    getRoleRefs(roleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection
                .where('roleId', '==', roleId)
                .where('userId', '==', userId)
                .get();
        });
    }
    getRoleRefsSuper(roleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection
                .where('roleId', '==', roleId)
                .where('userId', '==', userId)
                .where('isSuper', '==', true)
                .get();
        });
    }
    isAdminId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminId = yield this.roleModel.getIdByName(default_role_name_data_1.ROLE_NAME.admin);
            return id == adminId;
        });
    }
    isRoleUserManagerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleUserManagerId = yield this.roleModel.getIdByName(default_role_name_data_1.ROLE_NAME.roleUserManager);
            return id == roleUserManagerId;
        });
    }
    isRoleManagerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleManagerId = yield this.roleModel.getIdByName(default_role_name_data_1.ROLE_NAME.roleManager);
            return id == roleManagerId;
        });
    }
}
exports.RoleUser = RoleUser;
