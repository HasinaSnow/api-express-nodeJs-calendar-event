"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoutes = void 0;
const express_1 = require("express");
const role_controller_1 = require("../controllers/role.controller");
class RoleRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/', (req, res) => {
            new role_controller_1.RoleController(req, res).store();
        });
        this.router.get('/', (req, res) => {
            new role_controller_1.RoleController(req, res).index();
        });
        this.router.get('/:id', (req, res) => {
            new role_controller_1.RoleController(req, res).show();
        });
        this.router.put('/:id', (req, res) => {
            new role_controller_1.RoleController(req, res).update();
        });
        this.router.delete('/:id', (req, res) => {
            new role_controller_1.RoleController(req, res).delete();
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.RoleRoutes = RoleRoutes;
