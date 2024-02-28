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
exports.Role = void 0;
const firestore_1 = require("../../config/firestore");
const default_collection_name_1 = require("../../data/default-collection-name");
const base_model_1 = require("../base.model");
class Role extends base_model_1.BaseModel {
    constructor() {
        super(firestore_1.db.collection(default_collection_name_1.COLLECTION.role));
    }
    getIdByName(roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.where('name', '==', roleName).get()
                .then(role => {
                console.log('__role empty__', role.empty);
                return role.docs[0].id;
            });
            // .catch(error => { th})s
        });
    }
}
exports.Role = Role;
