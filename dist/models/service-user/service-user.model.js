"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUser = void 0;
const firebaseConfig_1 = require("../../config/firebaseConfig");
const default_collection_name_1 = require("../../data/default-collection-name");
const base_model_1 = require("../base.model");
class ServiceUser extends base_model_1.BaseModel {
    constructor() {
        super(firebaseConfig_1.db.collection(default_collection_name_1.COLLECTION.serviceUser));
    }
}
exports.ServiceUser = ServiceUser;
