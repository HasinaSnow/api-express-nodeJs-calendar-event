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
exports.SubscriberPermission = void 0;
const base_permission_1 = require("./base.permission");
const subscriber_model_1 = require("../models/subscriber/subscriber.model");
const default_role_name_data_1 = require("../data/default-role-name.data");
class SubscriberPermission extends base_permission_1.BasePermission {
    constructor(req) {
        super(req, default_role_name_data_1.ROLE_NAME.subscriberManager, new subscriber_model_1.Subscriber());
    }
    toStore() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classicPermission();
        });
    }
    toViewIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    toShow(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classicPermission();
        });
    }
    toUpdate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.privatePermission(id);
        });
    }
    toDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.privatePermission(id);
        });
    }
}
exports.SubscriberPermission = SubscriberPermission;
