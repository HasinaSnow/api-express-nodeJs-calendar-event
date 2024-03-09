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
exports.Service = void 0;
const firebaseConfig_1 = require("../../config/firebaseConfig");
const default_collection_name_1 = require("../../data/default-collection-name");
const base_model_1 = require("../base.model");
class Service extends base_model_1.BaseModel {
    constructor() {
        super(firebaseConfig_1.db.collection(default_collection_name_1.COLLECTION.service));
    }
    /**
     * get all user Id by the specified serviceId
     * @param string serviceId
     * @returns Promise<string[]>
     */
    getUserRefs(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield firebaseConfig_1.db.collection(default_collection_name_1.COLLECTION.user).where('serviceRefs', 'array-contains', serviceId).get())
                .docs.map(doc => doc.id);
        });
    }
    /**
     * get all event Id by the specified serviceId
     * @param string serviceId
     * @returns Promise<string[]>
     */
    getEventRefs(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield firebaseConfig_1.db.collection(default_collection_name_1.COLLECTION.event).where('serviceRefs', 'array-contains', serviceId).get())
                .docs.map(doc => doc.id);
        });
    }
}
exports.Service = Service;
