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
exports.ServiceUserPermission = void 0;
const base_permission_1 = require("./base.permission");
const default_role_name_data_1 = require("../data/default-role-name.data");
const service_user_model_1 = require("../models/service-user/service-user.model");
class ServiceUserPermission extends base_permission_1.BasePermission {
    constructor(req) {
        super(req, default_role_name_data_1.ROLE_NAME.serviceUserManager, new service_user_model_1.ServiceUser());
    }
    toStore() {
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
            return this.protectedPermission(id);
        });
    }
    toDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.privatePermission(id);
        });
    }
}
exports.ServiceUserPermission = ServiceUserPermission;
