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
exports.BaseController = void 0;
const response_1 = require("../utils/response");
const class_validator_1 = require("class-validator");
const ref_service_1 = require("../services/ref.service");
const role_user_model_1 = require("../models/role-user/role-user.model");
const role_model_1 = require("../models/role/role.model");
const user_model_1 = require("../models/user/user.model");
const utils_1 = require("../utils/utils");
const default_role_name_data_1 = require("../data/default-role-name.data");
const default_collection_name_1 = require("../data/default-collection-name");
const notif_action_1 = require("../actions/notif.action");
class BaseController {
    constructor(req, res, subject, model, createValidator, updateValidator, isPermis) {
        this.req = req;
        this.res = res;
        this.subject = subject;
        this.model = model;
        this.createValidator = createValidator;
        this.updateValidator = updateValidator;
        this.isPermis = isPermis;
        this.response = new response_1.ResponseService(res, subject);
    }
    store() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = this.createValidator.init(this.req.body);
            // verify permission
            if (!(yield this.isPermis.toStore()))
                return this.response.notAuthorized();
            // verify validation
            const errors = yield (0, class_validator_1.validate)(this.createValidator);
            if (errors.length > 0)
                return this.response.errorValidation(errors);
            // store data with ref in db
            const dataWithRef = yield ref_service_1.RefService.addRefs(this.req, data);
            return this.model.create(dataWithRef)
                .then((value) => __awaiter(this, void 0, void 0, function* () {
                (0, notif_action_1.notifyAction)(data, 'create', this.isPermis.role, this.subject, value.id, this.req);
                // dispacth notif
                // const notif = new NotifService()
                // const targets = await this.getNotifTargets(data)
                // const dataNotif = await this.getNotifData(value.id, 'create')
                // notif.dispatch(dataNotif, targets)
                //     .then(value => {
                //         notif.broadcast(value.notifId)
                //     })
            }))
                .then(_ => this.response.successfullStored())
                .catch((error) => this.response.errorServer(error));
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            // verify permission
            if (!(yield this.isPermis.toViewIndex()))
                return this.response.notAuthorized();
            const limit = this.req.params.limit !== undefined
                ? !Number.isNaN(parseInt(this.req.params.limit))
                    ? parseInt(this.req.params.limit)
                    : 30 : 30;
            const lastField = (0, class_validator_1.isDateString)(this.req.params.lastField) ? new Date(this.req.params.lastField) : undefined;
            this.model.getAll(limit, lastField)
                .then((result) => {
                const data = this.model.formatView(result.docs);
                return this.response.successfullGetted(data);
            })
                .catch(error => this.response.errorServer(error));
        });
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.req.params.id;
            this.model.getOne(id)
                .then((value) => __awaiter(this, void 0, void 0, function* () {
                if (value.exists) {
                    // verify permission
                    if (!(yield this.isPermis.toShow(id)))
                        return this.response.notAuthorized();
                    return this.response.successfullGetted(Object.assign({ id: value.id }, value.data()));
                }
                else {
                    return this.response.notFound();
                }
            }))
                .catch(error => this.response.errorServer(error));
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.req.params.id;
            const data = this.updateValidator.init(this.req.body);
            // verify permission
            if (!(yield this.isPermis.toUpdate(id)))
                return this.response.notAuthorized();
            // verify validation
            const errors = yield (0, class_validator_1.validate)(this.updateValidator);
            if (errors.length > 0)
                return this.response.errorValidation(errors);
            // create data with updatedRef (updatedBy & updatedAt)
            const dataWithRef = yield ref_service_1.RefService.newUpdatedRef(this.req, data);
            return this.model.update(id, dataWithRef)
                .then((value) => __awaiter(this, void 0, void 0, function* () {
                (0, notif_action_1.notifyAction)(data, 'update', this.isPermis.role, this.subject, id, this.req);
                // // dispacth notif
                // const notif = new NotifService()
                // const targets = await this.getNotifTargets(data)
                // const dataNotif = await this.getNotifData(id, 'update') 
                // notif.dispatch(dataNotif, targets)
                //     .then(value => {
                //         notif.broadcast(value.notifId)
                //     })
            }))
                .then(value => this.response.successfullUpdated(value))
                .catch(error => (error.code == 5)
                ? this.response.notFound()
                : this.response.errorServer(error));
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.req.params.id;
            // verify id
            if (!(yield this.exists(id)))
                return this.response.notFound();
            // verify permission
            if (!(yield this.isPermis.toDelete(id)))
                return this.response.notAuthorized();
            // delete document
            this.model.delete(id)
                .then(value => {
                (0, notif_action_1.notifyAction)(data, 'create', this.isPermis.role, this.subject, value.id, this.req);
            })
                .then((value) => __awaiter(this, void 0, void 0, function* () { return this.response.successfullDeleted(value); }))
                .catch(error => this.response.errorServer(error));
        });
    }
    exists(id) {
        return this.model.exists(id);
    }
    getNotifTargets(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleId = yield (new role_model_1.Role().getIdByName(this.isPermis.role));
            const roleAdminId = yield (new role_model_1.Role().getIdByName(default_role_name_data_1.ROLE_NAME.admin));
            let targets = yield (new role_user_model_1.RoleUser().getUserRefsByRoles([roleAdminId, roleId]));
            if (this.subject == default_collection_name_1.SUBJECT.event) {
                const targetRefsByService = (yield new user_model_1.User().getUserRefsByServices(data.serviceRefs));
                targets = [...targets, ...targetRefsByService];
            }
            return targets;
        });
    }
    getNotifData(subjectId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                type: type,
                subject: this.subject,
                subjectId: subjectId,
                author: yield (0, utils_1.getUidTokenInRequest)(this.req),
                createdAt: new Date()
            };
        });
    }
}
exports.BaseController = BaseController;
