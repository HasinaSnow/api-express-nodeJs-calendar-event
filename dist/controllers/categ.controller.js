"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategController = void 0;
const base_controller_1 = require("./base.controller");
const categ_permission_1 = require("../permission/categ.permission");
const default_collection_name_1 = require("../data/default-collection-name");
const categ_model_1 = require("../models/categ/categ.model");
const categ_validator_1 = require("../models/categ/categ.validator");
class CategController extends base_controller_1.BaseController {
    constructor(req, res) {
        super(req, res, default_collection_name_1.SUBJECT.categ, new categ_model_1.Categ(), new categ_validator_1.CategValidator(), new categ_validator_1.CategUpdateValidator(), new categ_permission_1.CategPermission(req));
    }
}
exports.CategController = CategController;
