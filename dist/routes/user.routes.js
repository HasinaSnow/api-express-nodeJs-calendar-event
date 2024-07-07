"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/', (req, res) => {
            // new UserController(req, res).store()
        });
        this.router.get('/', (req, res) => {
            new user_controller_1.UserController(req, res).index();
        });
        this.router.get('/:id', (req, res) => {
            new user_controller_1.UserController(req, res).show();
        });
        this.router.put('/:id', (req, res) => {
            new user_controller_1.UserController(req, res).update();
        });
        this.router.delete('/:id', (req, res) => {
            // new UserControllers(req, res).delete()
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.UserRoutes = UserRoutes;
