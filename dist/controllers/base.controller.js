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
            (0, class_validator_1.validate)(this.createValidator)
                .then((errors) => __awaiter(this, void 0, void 0, function* () {
                if (errors.length > 0) {
                    return this.response.errorValidation(errors);
                }
                else {
                    // create data with createRef (updatedBy & updatedAt)
                    const dataWithRef = yield ref_service_1.RefService.addRefs(this.req, data);
                    // store data with ref in db
                    this.model.create(dataWithRef)
                        .then((data) => {
                        // dispacth notif
                        // return response
                        return this.response.successfullStored();
                    })
                        .catch((error) => this.response.errorServer(error));
                }
            }));
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            // verify permission
            if (!(yield this.isPermis.toViewIndex()))
                return this.response.notAuthorized();
            this.model.getAll()
                .then((values) => {
                let data = [];
                values.forEach(doc => {
                    data.push(Object.assign({ id: doc.id }, doc.data()));
                });
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
            (0, class_validator_1.validate)(this.updateValidator).then((errors) => __awaiter(this, void 0, void 0, function* () {
                if (errors.length > 0)
                    return this.response.errorValidation(errors);
                // verify permission
                if (!(yield this.isPermis.toUpdate(id)))
                    return this.response.notAuthorized();
                // create data with updatedRef (updatedBy & updatedAt)
                const dataWithRef = yield ref_service_1.RefService.newUpdatedRef(this.req, data);
                this.model.update(id, dataWithRef)
                    .then(value => this.response.successfullUpdated(value))
                    .catch(error => (error.code == 5)
                    ? this.response.notFound()
                    : this.response.errorServer(error));
            }));
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.req.params.id;
            if (!(yield this.exists(id)))
                return this.response.notFound();
            // verify permission
            if (!(yield this.isPermis.toDelete(id)))
                return this.response.notAuthorized();
            this.model.delete(id)
                .then((value) => __awaiter(this, void 0, void 0, function* () { return this.response.successfullDeleted(value); }))
                .catch(error => this.response.errorServer(error));
        });
    }
    exists(id) {
        return this.model.exists(id);
    }
}
exports.BaseController = BaseController;
