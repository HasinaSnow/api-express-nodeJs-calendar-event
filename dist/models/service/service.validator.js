"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUpdateValidator = exports.ServiceValidator = void 0;
const class_validator_1 = require("class-validator");
class ServiceValidator {
    init(model) {
        this.name = model.name;
        this.infos = model.infos || '';
        return { name: this.name, infos: this.infos };
    }
}
exports.ServiceValidator = ServiceValidator;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 20)
], ServiceValidator.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255)
], ServiceValidator.prototype, "infos", void 0);
class ServiceUpdateValidator {
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
exports.ServiceUpdateValidator = ServiceUpdateValidator;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 20),
    (0, class_validator_1.IsOptional)()
], ServiceUpdateValidator.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)()
], ServiceUpdateValidator.prototype, "infos", void 0);
