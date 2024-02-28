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
exports.IsUnique = void 0;
const class_validator_1 = require("class-validator");
const firestore_1 = require("../../config/firestore");
function IsUnique(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "IsUnique",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const [relatedPropertyName] = args.constraints;
                        const relatedValue = args.object[relatedPropertyName];
                        if (!value)
                            return false;
                        const email = yield firestore_1.db.collection(property).where(propertyName, '==', value).get();
                        // console.log('____docs____', email.empty)
                        return email.empty;
                    });
                },
            },
        });
    };
}
exports.IsUnique = IsUnique;
