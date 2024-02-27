"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFirebase = void 0;
const app_1 = require("firebase/app");
const firebaseConfig_1 = require("./firebaseConfig");
const initFirebase = () => (0, app_1.initializeApp)(firebaseConfig_1.firebaseConfig);
exports.initFirebase = initFirebase;
