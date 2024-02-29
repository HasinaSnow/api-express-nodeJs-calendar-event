"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const response_1 = require("../utils/response");
// Middleware d'authentification
const authMiddleware = (req, res, next) => {
    var _a;
    const authToken = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const response = new response_1.ResponseService(res);
    if (!authToken) {
        return response.notAuthenticated();
    }
    firebaseConfig_1.auth.verifyIdToken(authToken)
        .then((decodedToken) => {
        // refresh token
        firebaseConfig_1.auth.createCustomToken(decodedToken.uid)
            .then((token) => {
            res.setHeader('Authorization', 'Bearer ' + token);
            next();
        });
    })
        .catch((error) => {
        switch (error.code) {
            case 'auth/expired-id-token':
                return response.errorServer(error);
            default:
                return response.notAuthenticated();
        }
    });
};
exports.authMiddleware = authMiddleware;
