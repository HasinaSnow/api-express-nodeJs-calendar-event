"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidator = void 0;
const class_validator_1 = require("class-validator");
class LoginValidator {
    init(model) {
        this.email = model.email || '';
        this.password = model.password || '';
        return { email: this.email, password: this.password };
    }
}
exports.LoginValidator = LoginValidator;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'This field must be required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'This field must be an valid email.' })
], LoginValidator.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 25),
    (0, class_validator_1.IsNotEmpty)({ message: 'Your password is required' })
], LoginValidator.prototype, "password", void 0);
