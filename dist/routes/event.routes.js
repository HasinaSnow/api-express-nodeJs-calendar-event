"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
class EventRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/attribuable', (req, res) => {
            new event_controller_1.EventController(req, res).indexAttribuable();
        });
        this.router.post('/', (req, res) => {
            new event_controller_1.EventController(req, res).store();
        });
        this.router.get('/', (req, res) => {
            new event_controller_1.EventController(req, res).index();
        });
        this.router.get('/:id', (req, res) => {
            new event_controller_1.EventController(req, res).show();
        });
        this.router.put('/:id', (req, res) => {
            new event_controller_1.EventController(req, res).update();
        });
        this.router.delete('/:id', (req, res) => {
            new event_controller_1.EventController(req, res).delete();
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.EventRoutes = EventRoutes;
