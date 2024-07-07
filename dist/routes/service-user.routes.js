"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUserRoutes = void 0;
const express_1 = require("express");
const service_user_controller_1 = require("../controllers/service-user.controller");
class ServiceUserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/', (req, res) => {
            new service_user_controller_1.ServiceUserController(req, res).store();
        });
        this.router.get('/', (req, res) => {
            new service_user_controller_1.ServiceUserController(req, res).index();
        });
        this.router.get('/:id', (req, res) => {
            new service_user_controller_1.ServiceUserController(req, res).show();
        });
        this.router.put('/:id', (req, res) => {
            new service_user_controller_1.ServiceUserController(req, res).update();
        });
        this.router.delete('/:id', (req, res) => {
            new service_user_controller_1.ServiceUserController(req, res).delete();
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.ServiceUserRoutes = ServiceUserRoutes;
