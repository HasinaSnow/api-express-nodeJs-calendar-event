import { Router } from "express";
import { EventServiceController } from "../controllers/event-service.controller";

export class EventServiceRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post('/', (req, res) => {
            new EventServiceController(req, res).store()
        });

        this.router.get('/', (req, res) => {
            new EventServiceController(req, res).index()
        });

        this.router.get('/:id', (req, res) => {
            new EventServiceController(req, res).show()
        });

        this.router.put('/:id', (req, res) => {
            new EventServiceController(req, res).update()
        });

        this.router.delete('/:id', (req, res) => {
            new EventServiceController(req, res).delete()
        });

    }

    public getRouter() {
        return this.router
    }

}