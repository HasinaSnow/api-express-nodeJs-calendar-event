"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUserController = void 0;
const base_controller_1 = require("./base.controller");
const default_collection_name_1 = require("../data/default-collection-name");
const service_user_model_1 = require("../models/service-user/service-user.model");
const service_user_validator_1 = require("../models/service-user/service-user.validator");
const service_user_permission_1 = require("../permission/service-user.permission");
class ServiceUserController extends base_controller_1.BaseController {
    constructor(req, res) {
        super(req, res, default_collection_name_1.SUBJECT.serviceUser, new service_user_model_1.ServiceUser(), new service_user_validator_1.ServiceUserValidator(), new service_user_validator_1.ServiceUserUpdateValidator(), new service_user_permission_1.ServiceUserPermission(req));
    }
}
exports.ServiceUserController = ServiceUserController;
