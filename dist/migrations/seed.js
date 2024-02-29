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
const firestore_1 = require("../config/firestore");
const categ_seed_1 = require("./seeders/categ.seed");
const event_seed_1 = require("./seeders/event.seed");
const service_seed_1 = require("./seeders/service.seed");
// add
function addDocs(colName, docs) {
    const docsCount = docs.length;
    let count = 0;
    docs.forEach(doc => {
        firestore_1.db.collection(colName).add(doc)
            .then(result => {
            count++;
            console.log(`___ADDED___${colName}--${result.id}`);
        });
    });
}
// fresh db
function freshDocs(colName) {
    return __awaiter(this, void 0, void 0, function* () {
        return firestore_1.db.collection(colName).listDocuments().then(docs => {
            if (docs.length === 0) {
                console.log(`____NO DOC TO REMOVED____`);
                return;
            }
            docs.forEach((doc) => __awaiter(this, void 0, void 0, function* () {
                yield doc.delete();
                console.log(`___REMOVED___${colName}--${doc.id}`);
            }));
        });
    });
}
// seed datas
function seed(collections) {
    return __awaiter(this, void 0, void 0, function* () {
        collections.forEach((collection) => __awaiter(this, void 0, void 0, function* () {
            yield freshDocs(collection.name);
            addDocs(collection.name, collection.docs);
        }));
    });
}
seed([service_seed_1.serviceCollection, categ_seed_1.categCollection, event_seed_1.eventCollection]);
