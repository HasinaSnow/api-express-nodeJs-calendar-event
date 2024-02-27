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
exports.BaseModel = void 0;
class BaseModel {
    constructor(collection) {
        this.collection = collection;
    }
    create(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.add(newData);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.collection.get()).docs;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.doc(id).get();
        });
    }
    update(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.doc(id).update(newData);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.doc(id).delete();
        });
    }
    exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getOne(id)).exists;
        });
    }
    isCreatedBy(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection.doc(id).get()
                .then(data => data.get('createdBy') == userId);
        });
    }
    isUpdatedBy(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection.doc(id).get()
                .then(data => data.get('updatedBy') == userId);
        });
    }
}
exports.BaseModel = BaseModel;
