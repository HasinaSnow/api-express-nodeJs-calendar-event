"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const base_controller_1 = require("./base.controller");
const default_collection_name_1 = require("../data/default-collection-name");
const service_model_1 = require("../models/service/service.model");
const service_validator_1 = require("../models/service/service.validator");
const service_permission_1 = require("../permission/service.permission");
class ServiceController extends base_controller_1.BaseController {
    constructor(req, res) {
        super(req, res, default_collection_name_1.SUBJECT.service, new service_model_1.Service(), new service_validator_1.ServiceValidator(), new service_validator_1.ServiceUpdateValidator(), new service_permission_1.ServicePermission(req));
    }
}
exports.ServiceController = ServiceController;
