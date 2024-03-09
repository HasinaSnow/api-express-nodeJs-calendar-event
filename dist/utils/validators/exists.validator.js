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
exports.ExistIn = void 0;
const class_validator_1 = require("class-validator");
const firebaseConfig_1 = require("../../config/firebaseConfig");
function ExistIn(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "ExistIn",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const [relatedPropertyName] = args.constraints;
                        const relatedValue = args.object[relatedPropertyName];
                        let result = undefined;
                        let data = undefined;
                        if ((0, class_validator_1.isEmail)(value)) {
                            data = (yield firebaseConfig_1.db.collection(property).where('email', '==', value).get());
                            result = !data.empty;
                        }
                        else if ((0, class_validator_1.isArray)(value)) {
                            if (value.length == 0)
                                return false;
                            const set = new Set();
                            for (const v of value)
                                set.add(v); // eliminer les doublons
                            console.log('___set___', set);
                            const values = Array.from(set); // tableau de valeur sans doublons
                            for (let i = 0; i < values.length; i++) {
                                const data = (yield firebaseConfig_1.db.collection(property).doc(values[i]).get());
                                if (!data.exists)
                                    return false;
                            }
                            result = true;
                        }
                        else {
                            data = (yield firebaseConfig_1.db.collection(property).doc(value).get());
                            result = data.exists;
                        }
                        return result;
                    });
                },
            },
        });
    };
}
exports.ExistIn = ExistIn;
