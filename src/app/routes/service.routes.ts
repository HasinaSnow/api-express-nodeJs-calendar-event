import { Router } from "express";
import { ServiceController } from "../controllers/service.conrtoller";

export class ServiceRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post('/', (req, res) => {
            new ServiceController(req, res).store()
        });

        this.router.get('/', (req, res) => {
            new ServiceController(req, res).index()
        });

        this.router.get('/:id', (req, res) => {
            new ServiceController(req, res).show()
        });

        this.router.put('/:id', (req, res) => {
            new ServiceController(req, res).update()
        });

        this.router.delete('/:id', (req, res) => {
            new ServiceController(req, res).delete()
        });

    }

    public getRouter() {
        return this.router
    }

}