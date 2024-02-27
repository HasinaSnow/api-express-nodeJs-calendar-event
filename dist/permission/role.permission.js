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
exports.RolePermission = void 0;
const base_permission_1 = require("./base.permission");
const role_model_1 = require("../models/role/role.model");
const default_role_name_data_1 = require("../data/default-role-name.data");
class RolePermission extends base_permission_1.BasePermission {
    constructor(req) {
        super(req, default_role_name_data_1.ROLE_NAME.roleManager, new role_model_1.Role());
    }
    toStore() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.superPermission();
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
            return this.superPermission();
        });
    }
    toDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.superPermission();
        });
    }
}
exports.RolePermission = RolePermission;
