"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberController = void 0;
const base_controller_1 = require("./base.controller");
const default_collection_name_1 = require("../data/default-collection-name");
const subscriber_permission_1 = require("../permission/subscriber.permission");
const subscriber_model_1 = require("../models/subscriber/subscriber.model");
const subscriber_validator_1 = require("../models/subscriber/subscriber.validator");
class SubscriberController extends base_controller_1.BaseController {
    constructor(req, res) {
        super(req, res, default_collection_name_1.SUBJECT.subscriber, new subscriber_model_1.Subscriber(), new subscriber_validator_1.SubscriberValidator(), new subscriber_validator_1.SubscriberUpdateValidator(), new subscriber_permission_1.SubscriberPermission(req));
    }
}
exports.SubscriberController = SubscriberController;
