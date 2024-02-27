"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberRoutes = void 0;
const express_1 = require("express");
const subscriber_controller_1 = require("../controllers/subscriber.controller");
class SubscriberRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/', (req, res) => {
            new subscriber_controller_1.SubscriberController(req, res).store();
        });
        this.router.get('/', (req, res) => {
            new subscriber_controller_1.SubscriberController(req, res).index();
        });
        this.router.get('/:id', (req, res) => {
            new subscriber_controller_1.SubscriberController(req, res).show();
        });
        this.router.put('/:id', (req, res) => {
            new subscriber_controller_1.SubscriberController(req, res).update();
        });
        this.router.delete('/:id', (req, res) => {
            new subscriber_controller_1.SubscriberController(req, res).delete();
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.SubscriberRoutes = SubscriberRoutes;
