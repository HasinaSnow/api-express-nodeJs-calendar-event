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
const base_model_1 = require("../base.model");
const role_model_1 = require("../role/role.model");
class RoleUser extends base_model_1.BaseModel {
    constructor(roleModel = new role_model_1.Role()) {
        super(firebaseConfig_1.db.collection(default_collection_name_1.COLLECTION.roleUser));
        this.roleModel = roleModel;
    }
    /**
     * get roleUser
     * @param string roleId
     * @param string userId
     * @return Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>
     */
    getRoleUser(roleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection
                .where('roleId', '==', roleId)
                .where('userId', '==', userId)
                .get();
        });
    }
    /**
     * get roleUser where super is true
     * @param string roleId
     * @param string userId
     * @return Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>
     */
    getRoleUserSuper(roleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection
                .where('roleId', '==', roleId)
                .where('userId', '==', userId)
                .where('isSuper', '==', true)
                .get();
        });
    }
    /**
     * get all role id by users
     * @param string[] userRefs
     * @returns Promise<string[]>
     */
    getRoleRefsByUsers(userRefs) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.collection
                .where('userId', 'in', userRefs)
                .get()).docs.map(doc => doc.id);
        });
    }
    /**
     * get all user id by roles
     * @param string[] roleRefs
     * @returns Promise<string[]>
     */
    getUserRefsByRoles(roleRefs) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.collection
                .where('roleId', 'in', roleRefs)
                .get()).docs.map(doc => doc.get('userId'));
        });
    }
}
exports.RoleUser = RoleUser;
