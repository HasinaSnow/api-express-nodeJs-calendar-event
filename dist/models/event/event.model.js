"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const firestore_1 = require("../../config/firestore");
const default_collection_name_1 = require("../../data/default-collection-name");
const base_model_1 = require("../base.model");
class Event extends base_model_1.BaseModel {
    constructor() {
        super(firestore_1.db.collection(default_collection_name_1.COLLECTION.event));
    }
}
exports.Event = Event;
