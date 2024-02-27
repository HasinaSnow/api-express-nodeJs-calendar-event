"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUpdateValidator = exports.RoleValidator = void 0;
const class_validator_1 = require("class-validator");
const unique_validator_1 = require("../../utils/validators/unique.validator");
const default_collection_name_1 = require("../../data/default-collection-name");
class RoleValidator {
    init(model) {
        this.name = model.name || '';
        this.infos = model.infos || '';
        return { name: this.name, infos: this.infos };
    }
}
exports.RoleValidator = RoleValidator;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 20),
    (0, unique_validator_1.IsUnique)(default_collection_name_1.COLLECTION.role, { message: 'The name field is already exists.' })
], RoleValidator.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255)
], RoleValidator.prototype, "infos", void 0);
class RoleUpdateValidator {
    init(model) {
        this.name = model.name;
        this.infos = model.infos;
        const m = { name: this.name, infos: this.infos };
        return Object.keys(m)
            .reduce((result, key) => {
            if (m[key] !== undefined) {
                result[key] = m[key];
            }
            return result;
        }, {});
    }
}
exports.RoleUpdateValidator = RoleUpdateValidator;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 20),
    (0, class_validator_1.IsOptional)(),
    (0, unique_validator_1.IsUnique)(default_collection_name_1.COLLECTION.role, { message: 'The name field is already exists.' })
], RoleUpdateValidator.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)()
], RoleUpdateValidator.prototype, "infos", void 0);
