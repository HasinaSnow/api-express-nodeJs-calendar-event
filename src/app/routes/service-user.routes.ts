import { Router } from "express";
import { ServiceUserController } from "../controllers/service-user.controller";

export class ServiceUserRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post('/', (req, res) => {
            new ServiceUserController(req, res).store()
        });

        this.router.get('/', (req, res) => {
            new ServiceUserController(req, res).index()
        });

        this.router.get('/:id', (req, res) => {
            new ServiceUserController(req, res).show()
        });

        this.router.put('/:id', (req, res) => {
            new ServiceUserController(req, res).update()
        });

        this.router.delete('/:id', (req, res) => {
            new ServiceUserController(req, res).delete()
        });

    }

    public getRouter() {
        return this.router
    }

}