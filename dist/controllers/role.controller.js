"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const base_controller_1 = require("./base.controller");
const role_permission_1 = require("../permission/role.permission");
const default_collection_name_1 = require("../data/default-collection-name");
const role_model_1 = require("../models/role/role.model");
const role_validator_1 = require("../models/role/role.validator");
class RoleController extends base_controller_1.BaseController {
    constructor(req, res) {
        super(req, res, default_collection_name_1.SUBJECT.role, new role_model_1.Role(), new role_validator_1.RoleValidator(), new role_validator_1.RoleUpdateValidator(), new role_permission_1.RolePermission(req));
    }
}
exports.RoleController = RoleController;
