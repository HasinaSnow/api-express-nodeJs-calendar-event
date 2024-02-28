"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUserUpdateValidator = exports.RoleUserValidator = void 0;
const class_validator_1 = require("class-validator");
const exists_validator_1 = require("../../utils/validators/exists.validator");
const default_collection_name_1 = require("../../data/default-collection-name");
class RoleUserValidator {
    init(model) {
        this.userId = model.userId || '';
        this.roleId = model.roleId || '';
        this.isSuper = (model.isSuper !== undefined) ? model.isSuper : undefined;
        return { userId: this.userId, roleId: this.roleId, isSuper: this.isSuper };
    }
}
exports.RoleUserValidator = RoleUserValidator;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The user id is required.' }),
    (0, exists_validator_1.ExistIn)(default_collection_name_1.COLLECTION.user, { message: 'The user id is invalid' })
], RoleUserValidator.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The role id is required.' }),
    (0, exists_validator_1.ExistIn)(default_collection_name_1.COLLECTION.role, { message: 'The role id is invalid' })
], RoleUserValidator.prototype, "roleId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The field isSuper is required.' })
], RoleUserValidator.prototype, "isSuper", void 0);
class RoleUserUpdateValidator {
    init(model) {
        this.userId = model.userId;
        this.roleId = model.roleId;
        this.isSuper = model.isSuper;
        const m = { userId: this.userId, roleId: this.roleId, isSuper: this.isSuper };
        return Object.keys(m)
            .reduce((result, key) => {
            if (m[key] !== undefined) {
                result[key] = m[key];
            }
            return result;
        }, {});
    }
}
exports.RoleUserUpdateValidator = RoleUserUpdateValidator;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, exists_validator_1.ExistIn)(default_collection_name_1.COLLECTION.user, { message: 'The user id is invalid' })
], RoleUserUpdateValidator.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, exists_validator_1.ExistIn)(default_collection_name_1.COLLECTION.role, { message: 'The role id is invalid' })
], RoleUserUpdateValidator.prototype, "roleId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)()
], RoleUserUpdateValidator.prototype, "isSuper", void 0);
