"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUserController = void 0;
const base_controller_1 = require("./base.controller");
const role_user_permission_1 = require("../permission/role-user.permission");
const default_collection_name_1 = require("../data/default-collection-name");
const role_user_model_1 = require("../models/role-user/role-user.model");
const role_user_validator_1 = require("../models/role-user/role-user.validator");
class RoleUserController extends base_controller_1.BaseController {
    constructor(req, res) {
        super(req, res, default_collection_name_1.SUBJECT.roleUser, new role_user_model_1.RoleUser(), new role_user_validator_1.RoleUserValidator(), new role_user_validator_1.RoleUserUpdateValidator(), new role_user_permission_1.RoleUserPermission(req));
    }
}
exports.RoleUserController = RoleUserController;
