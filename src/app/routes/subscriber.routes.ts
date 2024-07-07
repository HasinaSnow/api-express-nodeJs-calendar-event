import { Router } from "express";
import { SubscriberController } from "../controllers/subscriber.controller";

export class SubscriberRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post('/', (req, res) => {
            new SubscriberController(req, res).store()
        });

        this.router.get('/', (req, res) => {
            new SubscriberController(req, res).index()
        });

        this.router.get('/:id', (req, res) => {
            new SubscriberController(req, res).show()
        });

        this.router.put('/:id', (req, res) => {
            new SubscriberController(req, res).update()
        });

        this.router.delete('/:id', (req, res) => {
            new SubscriberController(req, res).delete()
        });

    }

    public getRouter() {
        return this.router
    }

}