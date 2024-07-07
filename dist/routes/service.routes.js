"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = require("express");
const service_conrtoller_1 = require("../controllers/service.conrtoller");
class ServiceRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/', (req, res) => {
            new service_conrtoller_1.ServiceController(req, res).store();
        });
        this.router.get('/', (req, res) => {
            new service_conrtoller_1.ServiceController(req, res).index();
        });
        this.router.get('/:id', (req, res) => {
            new service_conrtoller_1.ServiceController(req, res).show();
        });
        this.router.put('/:id', (req, res) => {
            new service_conrtoller_1.ServiceController(req, res).update();
        });
        this.router.delete('/:id', (req, res) => {
            new service_conrtoller_1.ServiceController(req, res).delete();
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.ServiceRoutes = ServiceRoutes;
