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
    getUserRefs(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield firebaseConfig_1.db.collection(default_collection_name_1.COLLECTION.serviceUser).where('serviceId', '==', serviceId).get())
                .docs.map(doc => doc.get('userId'));
        });
    }
    getEventRefs(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield firebaseConfig_1.db.collection(default_collection_name_1.COLLECTION.eventService).where('serviceId', '==', serviceId).get())
                .docs.map(doc => doc.get('eventId'));
        });
    }
}
exports.Service = Service;
