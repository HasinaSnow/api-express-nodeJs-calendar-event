import { Router } from "express";
import { NotifController } from "../controllers/notif.controller";

export class NotifRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {

        this.router.get('/', (req, res) => {
            new NotifController(req, res).index()
        });

    }

    public getRouter() {
        return this.router
    }

}