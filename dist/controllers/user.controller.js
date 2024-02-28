"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const base_controller_1 = require("./base.controller");
const class_validator_1 = require("class-validator");
const user_permission_1 = require("../permission/user.permission");
const default_collection_name_1 = require("../data/default-collection-name");
const user_model_1 = require("../models/user/user.model");
const user_validator_1 = require("../models/user/user.validator");
class UserController extends base_controller_1.BaseController {
    constructor(req, res) {
        const updateValidator = new user_validator_1.UserUpdateValidator();
        super(req, res, default_collection_name_1.SUBJECT.user, new user_model_1.User(), new user_validator_1.UserValidator(), updateValidator, new user_permission_1.UserPermission(req));
        this.userUpdateValidator = updateValidator;
    }
    updateUserPublicInfos() {
        const id = this.req.params.id;
        const data = this.userUpdateValidator.init(this.req.body);
        (0, class_validator_1.validate)(this.userUpdateValidator).then(errors => {
            if (errors.length > 0)
                return this.response.errorValidation(errors);
            this.model.update(id, data)
                .then(value => this.response.successfullUpdated(value))
                .catch(error => (error.code == 5)
                ? this.response.notFound()
                : this.response.errorServer(error));
        });
    }
}
exports.UserController = UserController;
