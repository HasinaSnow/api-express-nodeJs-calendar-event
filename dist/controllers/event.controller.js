"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const event_model_1 = require("../models/event/event.model");
const event_validator_1 = require("../models/event/event.validator");
const base_controller_1 = require("./base.controller");
const event_permission_1 = require("../permission/event.permission");
const default_collection_name_1 = require("../data/default-collection-name");
class EventController extends base_controller_1.BaseController {
    constructor(req, res) {
        super(req, res, default_collection_name_1.SUBJECT.event, new event_model_1.Event(), new event_validator_1.EventValidator(), new event_validator_1.EventUpdateValidator(), new event_permission_1.EventPermission(req));
    }
}
exports.EventController = EventController;
