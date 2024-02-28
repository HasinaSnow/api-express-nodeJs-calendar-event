"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategRoutes = void 0;
const express_1 = require("express");
const categ_controller_1 = require("../controllers/categ.controller");
class CategRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/', (req, res) => {
            new categ_controller_1.CategController(req, res).store();
        });
        this.router.get('/', (req, res) => {
            new categ_controller_1.CategController(req, res).index();
        });
        this.router.get('/:id', (req, res) => {
            new categ_controller_1.CategController(req, res).show();
        });
        this.router.put('/:id', (req, res) => {
            new categ_controller_1.CategController(req, res).update();
        });
        this.router.delete('/:id', (req, res) => {
            new categ_controller_1.CategController(req, res).delete();
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.CategRoutes = CategRoutes;
