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
        return this.collection.add(newData);
    }
    getAll(limit, lastFieldValue) {
        let collection = this.collection
            .orderBy('createdAt', 'desc')
            .limit(limit);
        if (lastFieldValue !== undefined)
            collection = collection
                .startAfter(lastFieldValue);
        return collection.get();
    }
    getOne(id) {
        return this.collection.doc(id).get();
    }
    update(id, newData) {
        return this.collection.doc(id).update(newData);
    }
    delete(id) {
        return this.collection.doc(id).delete();
    }
    exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getOne(id)).exists;
        });
    }
    isCreatedBy(id, userId) {
        return this.collection.doc(id).get()
            .then(data => data.get('createdBy') == userId);
    }
    isUpdatedBy(id, userId) {
        return this.collection.doc(id).get()
            .then(data => data.get('updatedBy') == userId);
    }
    formatView(docs) {
        let data = [];
        docs.map(doc => {
            data.push(Object.assign({ id: doc.id }, doc.data()));
        });
        return data;
    }
}
exports.BaseModel = BaseModel;
