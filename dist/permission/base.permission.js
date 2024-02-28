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
exports.BasePermission = void 0;
const permission_service_1 = require("../services/permission.service");
class BasePermission {
    constructor(req, role, model) {
        this.req = req;
        this.role = role;
        this.model = model;
        this.userCurrent = new permission_service_1.PermissionService(req, model);
    }
    /**
     * isAdmin || isPermis
     */
    classicPermission() {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield this.userCurrent.isAdmin()) || (yield this.userCurrent.isPermis(this.role)))
                ? true : false;
        });
    }
    /**
     *  isAdmin || (isPermis && (isAuthor || isSuper))
     * @param id string: idModel
     * @returns Promise<Boolean>
     */
    protectedPermission(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.userCurrent.isAdmin())
                ? true
                : (yield this.userCurrent.isPermis(this.role))
                    && ((yield this.userCurrent.isSuper(this.role)) || (yield this.userCurrent.isAuthor(id)))
                    ? true : false;
        });
    }
    /**
     * (iqAdmin || isPermis) && (isSuper || isAuthor)
     * @param id string: idModel
     * @returns Promise<Boolean>
     */
    privatePermission(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield this.userCurrent.isAdmin()) || (yield this.userCurrent.isPermis(this.role)))
                ? ((yield this.userCurrent.isSuper(this.role)) || (yield this.userCurrent.isAuthor(id)))
                    ? true : false
                : false;
        });
    }
    /**
     *  isPermis && isSuper
     * @param id string idModel
     * @returns Promise<Boolean>
     */
    superPermission() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.userCurrent.isPermis(this.role))
                && (yield this.userCurrent.isSuper(this.role))
                ? true : false;
        });
    }
}
exports.BasePermission = BasePermission;
