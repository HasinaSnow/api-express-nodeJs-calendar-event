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
exports.EventController = void 0;
const event_model_1 = require("../models/event/event.model");
const event_validator_1 = require("../models/event/event.validator");
const base_controller_1 = require("./base.controller");
const event_permission_1 = require("../permission/event.permission");
const default_collection_name_1 = require("../data/default-collection-name");
const user_model_1 = require("../models/user/user.model");
const utils_1 = require("../utils/utils");
class EventController extends base_controller_1.BaseController {
    constructor(req, res, event = new event_model_1.Event()) {
        super(req, res, default_collection_name_1.SUBJECT.event, event, new event_validator_1.EventValidator(), new event_validator_1.EventUpdateValidator(), new event_permission_1.EventPermission(req));
        this.event = event;
    }
    indexAttribuable() {
        return __awaiter(this, void 0, void 0, function* () {
            // params
            const filterParams = {
                date: parseInt(this.req.params.date) || undefined,
                month: parseInt(this.req.params.month) || undefined,
                year: parseInt(this.req.params.year) || undefined,
                categId: this.req.params.categId
            };
            const limitMonthIndex = parseInt(this.req.params.limit_month) || 11;
            let serviceRefs;
            if (yield this.isPermis.toViewIndex())
                serviceRefs = [];
            else {
                const userId = yield (0, utils_1.getUidToken)(this.req);
                serviceRefs = yield new user_model_1.User().getServiceRefs(userId);
                if (serviceRefs.length == 0)
                    serviceRefs = ['serviceRefsIsEmpty'];
            }
            return this.event.getByServices(limitMonthIndex, serviceRefs)
                .then(result => {
                const data = this.event.getfilterEvent(result.docs, filterParams);
                const dataFormated = this.model.formatView(data);
                return this.response.successfullGetted(dataFormated);
            })
                .catch(error => this.response.errorServer(error));
        });
    }
    indexServiceRefs(eventId) {
        return this.event.getServiceRefs(eventId);
    }
}
exports.EventController = EventController;
