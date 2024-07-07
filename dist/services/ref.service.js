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
exports.RefService = void 0;
const utils_1 = require("../utils/utils");
class RefService {
    /**
     * add createdAt and updatedAt's property
     * @param data object
     * @return object
     */
    static addRefs(req, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, data), { createdAt: new Date(), createdBy: yield (0, utils_1.getUidTokenInRequest)(req), updatedAt: null, updatedBy: null });
        });
    }
    static newUpdatedRef(req, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, data), { updatedAt: new Date(), updatedBy: yield (0, utils_1.getUidTokenInRequest)(req) });
        });
    }
}
exports.RefService = RefService;
