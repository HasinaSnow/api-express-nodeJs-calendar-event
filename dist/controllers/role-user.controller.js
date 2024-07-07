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
exports.RoleUserController = void 0;
const base_controller_1 = require("./base.controller");
const role_user_permission_1 = require("../permission/role-user.permission");
const default_collection_name_1 = require("../data/default-collection-name");
const role_user_model_1 = require("../models/role-user/role-user.model");
const role_user_validator_1 = require("../models/role-user/role-user.validator");
const class_validator_1 = require("class-validator");
const ref_service_1 = require("../services/ref.service");
const role_model_1 = require("../models/role/role.model");
const default_role_name_data_1 = require("../data/default-role-name.data");
class RoleUserController extends base_controller_1.BaseController {
    constructor(req, res, roleUser = new role_user_model_1.RoleUser(), permission = new role_user_permission_1.RoleUserPermission(req)) {
        super(req, res, default_collection_name_1.SUBJECT.roleUser, roleUser, new role_user_validator_1.RoleUserValidator(), new role_user_validator_1.RoleUserUpdateValidator(), permission);
        this.roleUser = roleUser;
        this.permission = permission;
    }
    attribute() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = this.createValidator.init(this.req.body);
            // verify permission
            if (!(yield this.permission.toAttribute()))
                return this.response.notAuthorized();
            // verify validation
            const errors = yield (0, class_validator_1.validate)(this.createValidator);
            if (errors.length > 0)
                return this.response.errorValidation(errors);
            // verify the attributed role
            if (yield this.isNotAttributedRef())
                return this.response.notAuthorized();
            // store data with ref in db
            const dataWithRef = yield ref_service_1.RefService.addRefs(this.req, data);
            this.model.create(dataWithRef)
                .then((data) => {
                // dispacth notif
                // return response
                return this.response.successfullStored(data);
            })
                .catch((error) => this.response.errorServer(error));
        });
    }
    updateAttribute() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.req.params.id;
            const data = this.updateValidator.init(this.req.body);
            // verify permission
            if (!(yield this.permission.toUpdateAttribute(id)))
                return this.response.notAuthorized();
            // verify validation
            const errors = yield (0, class_validator_1.validate)(this.createValidator);
            if (errors.length > 0)
                return this.response.errorValidation(errors);
            // verify the attributed role
            if (yield this.isNotAttributedRef())
                return this.response.notAuthorized();
            // create data with updatedRef (updatedBy & updatedAt)
            const dataWithRef = yield ref_service_1.RefService.newUpdatedRef(this.req, data);
            return this.model.update(id, dataWithRef)
                .then(value => this.response.successfullUpdated(value))
                .catch(error => (error.code == 5)
                ? this.response.notFound()
                : this.response.errorServer(error));
        });
    }
    isNotAttributedRef() {
        return __awaiter(this, void 0, void 0, function* () {
            const role = new role_model_1.Role();
            const isAdminRef = (yield role.getIdByName(default_role_name_data_1.ROLE_NAME.admin)) == this.req.body.roleId;
            const isRoleUserManagerRef = (yield role.getIdByName(default_role_name_data_1.ROLE_NAME.roleUserManager)) == this.req.body.roleId;
            const isRoleManagerRef = (yield role.getIdByName(default_role_name_data_1.ROLE_NAME.roleManager)) == this.req.body.roleId;
            return (isAdminRef || isRoleUserManagerRef || isRoleManagerRef);
        });
    }
}
exports.RoleUserController = RoleUserController;
