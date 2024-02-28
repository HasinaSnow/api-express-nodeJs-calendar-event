"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUserController = void 0;
const base_controller_1 = require("./base.controller");
const default_collection_name_1 = require("../data/default-collection-name");
const service_user_model_1 = require("../models/service-user/service-user.model");
class ServiceUserController extends base_controller_1.BaseController {
    constructor(req, res) {
        super(req, res, default_collection_name_1.SUBJECT.serviceUser, new service_user_model_1.ServiceUser(), new ServiceUserValidator(), new ServiceUserUpdateValidator(), new ServiceUserPermission(req));
    }
}
exports.ServiceUserController = ServiceUserController;
