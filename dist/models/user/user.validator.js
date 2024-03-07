"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateValidator = exports.UserValidator = void 0;
const class_validator_1 = require("class-validator");
const unique_validator_1 = require("../../utils/validators/unique.validator");
const default_collection_name_1 = require("../../data/default-collection-name");
const exists_validator_1 = require("../../utils/validators/exists.validator");
class UserValidator {
    init(model) {
        this.name = model.name || '';
        this.userRef = model.userRef || '';
        this.infos = model.infos || '';
        return { name: this.name, infos: this.infos, userRef: this.userRef, serviceRefs: this.serviceRefs };
    }
}
exports.UserValidator = UserValidator;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Your Name is required' }),
    (0, unique_validator_1.IsUnique)(default_collection_name_1.COLLECTION.user, { message: 'The name is already exists' }),
    (0, class_validator_1.Length)(3, 25)
], UserValidator.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The user id is required.' })
], UserValidator.prototype, "userRef", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255)
], UserValidator.prototype, "infos", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The service id is required.' }),
    (0, class_validator_1.IsOptional)(),
    (0, exists_validator_1.ExistIn)(default_collection_name_1.COLLECTION.service, { message: 'One of id service is invalid' })
], UserValidator.prototype, "serviceRefs", void 0);
class UserUpdateValidator {
    init(model) {
        this.name = model.name;
        this.infos = model.infos;
        const m = { name: this.name, infos: this.infos, serviceRefs: this.serviceRefs };
        return Object.keys(m)
            .reduce((result, key) => {
            if (m[key] !== undefined) {
                result[key] = m[key];
            }
            return result;
        }, {});
    }
}
exports.UserUpdateValidator = UserUpdateValidator;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Your Name is required' }),
    (0, class_validator_1.Length)(3, 25),
    (0, unique_validator_1.IsUnique)(default_collection_name_1.COLLECTION.user, { message: 'The name is already exists' }),
    (0, class_validator_1.IsOptional)()
], UserUpdateValidator.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)()
], UserUpdateValidator.prototype, "infos", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The service id is required.' }),
    (0, class_validator_1.IsOptional)(),
    (0, exists_validator_1.ExistIn)(default_collection_name_1.COLLECTION.service, { message: 'One of id service is invalid' })
], UserUpdateValidator.prototype, "serviceRefs", void 0);
