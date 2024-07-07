"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterValidator = void 0;
const class_validator_1 = require("class-validator");
const exists_validator_1 = require("../../utils/validators/exists.validator");
const unique_validator_1 = require("../../utils/validators/unique.validator");
class RegisterValidator {
    init(model) {
        this.name = model.name || '';
        this.email = model.email || '';
        this.password = model.password || '';
        return { name: this.name, email: this.email, password: this.password };
    }
}
exports.RegisterValidator = RegisterValidator;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Your Name number is required' }),
    (0, class_validator_1.Length)(3, 25)
], RegisterValidator.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'The email field must be required.' }),
    (0, exists_validator_1.ExistIn)('subscribers', { message: 'You are not authorized to register. Please, contact the service.' }),
    (0, unique_validator_1.IsUnique)('users', { message: 'This email is already taked.' })
], RegisterValidator.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 25),
    (0, class_validator_1.IsNotEmpty)({ message: 'Your Phone number is required' })
], RegisterValidator.prototype, "password", void 0);
