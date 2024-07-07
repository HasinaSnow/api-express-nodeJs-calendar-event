"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUserRoutes = void 0;
const express_1 = require("express");
const role_user_controller_1 = require("../controllers/role-user.controller");
class RoleUserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/', (req, res) => {
            new role_user_controller_1.RoleUserController(req, res).store();
        });
        this.router.post('/attribute', (req, res) => {
            new role_user_controller_1.RoleUserController(req, res).attribute();
        });
        this.router.get('/', (req, res) => {
            new role_user_controller_1.RoleUserController(req, res).index();
        });
        this.router.get('/:id', (req, res) => {
            new role_user_controller_1.RoleUserController(req, res).show();
        });
        this.router.put('/:id', (req, res) => {
            new role_user_controller_1.RoleUserController(req, res).update();
        });
        this.router.delete('/:id', (req, res) => {
            new role_user_controller_1.RoleUserController(req, res).delete();
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.RoleUserRoutes = RoleUserRoutes;
