import { Router } from "express";
import { NotifController } from "../controllers/notif.controller";

export class NotifRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post('/', (req, res) => {
            new NotifController(req, res).store()
        });

        this.router.get('/', (req, res) => {
            new NotifController(req, res).index()
        });

        this.router.get('/:id', (req, res) => {
            new NotifController(req, res).show()
        });

        // this.router.put('/:id', (req, res) => {
        //     new NotifController(req, res).update()
        // });

        this.router.delete('/:id', (req, res) => {
            new NotifController(req, res).delete()
        });

    }

    public getRouter() {
        return this.router
    }

}