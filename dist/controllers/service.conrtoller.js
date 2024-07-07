"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const base_controller_1 = require("./base.controller");
const default_collection_name_1 = require("../data/default-collection-name");
const service_model_1 = require("../models/service/service.model");
const service_validator_1 = require("../models/service/service.validator");
const service_permission_1 = require("../permission/service.permission");
class ServiceController extends base_controller_1.BaseController {
    constructor(req, res, service = new service_model_1.Service()) {
        super(req, res, default_collection_name_1.SUBJECT.service, service, new service_validator_1.ServiceValidator(), new service_validator_1.ServiceUpdateValidator(), new service_permission_1.ServicePermission(req));
        this.service = service;
    }
    indexUserRefs(serviceId) {
        return this.service.getUserRefs(serviceId);
    }
    /**
     * get all refs of events for the specific serviceId
     * @param string serviceId
     * @return Promise<string>
     */
    indexEventRefs(serviceId) {
        return this.service.getEventRefs(serviceId);
    }
}
exports.ServiceController = ServiceController;
