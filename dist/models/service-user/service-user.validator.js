"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUserUpdateValidator = exports.ServiceUserValidator = void 0;
const class_validator_1 = require("class-validator");
const exists_validator_1 = require("../../utils/validators/exists.validator");
const default_collection_name_1 = require("../../data/default-collection-name");
class ServiceUserValidator {
    init(model) {
        this.userId = model.userId || '';
        this.serviceId = model.serviceId || '';
        return { userId: this.userId, serviceId: this.serviceId };
    }
}
exports.ServiceUserValidator = ServiceUserValidator;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The user id is required.' }),
    (0, exists_validator_1.ExistIn)(default_collection_name_1.COLLECTION.user, { message: 'The user id is invalid' })
], ServiceUserValidator.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The role id is required.' }),
    (0, exists_validator_1.ExistIn)(default_collection_name_1.COLLECTION.service, { message: 'The service id is invalid' })
], ServiceUserValidator.prototype, "serviceId", void 0);
class ServiceUserUpdateValidator {
    init(model) {
        this.userId = model.userId;
        this.serviceId = model.serviceId;
        const m = { userId: this.userId, serviceId: this.serviceId };
        return Object.keys(m)
            .reduce((result, key) => {
            if (m[key] !== undefined) {
                result[key] = m[key];
            }
            return result;
        }, {});
    }
}
exports.ServiceUserUpdateValidator = ServiceUserUpdateValidator;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, exists_validator_1.ExistIn)(default_collection_name_1.COLLECTION.user, { message: 'The user id is invalid' })
], ServiceUserUpdateValidator.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, exists_validator_1.ExistIn)(default_collection_name_1.COLLECTION.service, { message: 'The service id is invalid' })
], ServiceUserUpdateValidator.prototype, "serviceId", void 0);
