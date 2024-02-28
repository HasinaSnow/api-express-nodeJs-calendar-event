"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberUpdateValidator = exports.SubscriberValidator = void 0;
const class_validator_1 = require("class-validator");
const unique_validator_1 = require("../../utils/validators/unique.validator");
const default_collection_name_1 = require("../../data/default-collection-name");
class SubscriberValidator {
    init(model) {
        var _a, _b;
        this.email = ((_a = (model.email)) === null || _a === void 0 ? void 0 : _a.trim()) || '';
        this.phone = ((_b = (model.phone)) === null || _b === void 0 ? void 0 : _b.trim()) || null;
        this.subscribeAt = model.subscribeAt || null;
        return { email: this.email, phone: this.phone, subscribeAt: this.subscribeAt };
    }
}
exports.SubscriberValidator = SubscriberValidator;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, unique_validator_1.IsUnique)(default_collection_name_1.COLLECTION.subscriber, { message: 'The email is already exists' }),
    (0, class_validator_1.IsOptional)()
], SubscriberValidator.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('MG'),
    (0, unique_validator_1.IsUnique)(default_collection_name_1.COLLECTION.subscriber, { message: 'The phoneNumber is already exists' }),
    (0, class_validator_1.IsOptional)()
], SubscriberValidator.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)()
], SubscriberValidator.prototype, "subscribeAt", void 0);
class SubscriberUpdateValidator {
    init(model) {
        this.email = model.email;
        this.phone = model.phone;
        this.subscribeAt = model.subscribeAt;
        const m = { email: this.email, phone: this.phone, subscribeAt: this.subscribeAt };
        return Object.keys(m)
            .reduce((result, key) => {
            if (m[key] !== undefined) {
                result[key] = m[key];
            }
            return result;
        }, {});
    }
}
exports.SubscriberUpdateValidator = SubscriberUpdateValidator;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, unique_validator_1.IsUnique)(default_collection_name_1.COLLECTION.subscriber, { message: 'The email is already exists' }),
    (0, class_validator_1.IsOptional)()
], SubscriberUpdateValidator.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('MG'),
    (0, unique_validator_1.IsUnique)(default_collection_name_1.COLLECTION.subscriber, { message: 'The email is already exists' }),
    (0, class_validator_1.IsOptional)()
], SubscriberUpdateValidator.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)()
], SubscriberUpdateValidator.prototype, "subscribeAt", void 0);
