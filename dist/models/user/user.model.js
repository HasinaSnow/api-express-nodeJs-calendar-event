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
exports.User = void 0;
const firebaseConfig_1 = require("../../config/firebaseConfig");
const default_collection_name_1 = require("../../data/default-collection-name");
const base_model_1 = require("../base.model");
class User extends base_model_1.BaseModel {
    constructor() {
        super(firebaseConfig_1.db.collection(default_collection_name_1.COLLECTION.user));
    }
    /**
     * store a new user document in the collection
     * @param object newData
     * @param string uid
     * @returns Promise<FirebaseFirestore.WriteResult>
     */
    registerNewUser(newData, uid) {
        return this.collection.doc(uid).set(newData);
    }
    /**
     * get all service Id by the specified userId
     * @param string userId
     * @returns Promise<string[]>
     */
    getServiceRefs(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.collection.doc(userId).get())
                .get('serviceRefs');
        });
    }
    /**
     * get all user id by specified services
     * @param string[] serviceRefs
     * @returns Promise<string[]>
     */
    getUserRefsByServices(serviceRefs) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.collection
                .where('serviceRefs', 'array-contains-any', serviceRefs)
                .get()).docs.map(doc => doc.id);
        });
    }
    /**
     * get all role Id by the specified userId
     * @param string userId
     * @returns Promise<string[]>
     */
    getRoleRefs(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield firebaseConfig_1.db.collection(default_collection_name_1.COLLECTION.roleUser).where('userId', '==', userId).get())
                .docs.map(doc => doc.get('roleId'));
        });
    }
}
exports.User = User;
