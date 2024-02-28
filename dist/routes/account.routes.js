"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRoutes = void 0;
const express_1 = require("express");
const account_controller_1 = require("../controllers/account.controller");
class AccountRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/signup', (req, res) => {
            new account_controller_1.AccountController(req, res).signup();
        });
        this.router.post('/signin', (req, res) => {
            new account_controller_1.AccountController(req, res).signin();
        });
        this.router.post('/signout', (req, res) => {
            new account_controller_1.AccountController(req, res).signout();
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.AccountRoutes = AccountRoutes;
