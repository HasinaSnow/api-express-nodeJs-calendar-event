import { Router } from "express";
import { CategController } from "../controllers/categ.controller";

export class CategRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post('/', (req, res) => {
            new CategController(req, res).store()
        });

        this.router.get('/', (req, res) => {
            new CategController(req, res).index()
        });

        this.router.get('/:id', (req, res) => {
            new CategController(req, res).show()
        });

        this.router.put('/:id', (req, res) => {
            new CategController(req, res).update()
        });

        this.router.delete('/:id', (req, res) => {
            new CategController(req, res).delete()
        });

    }

    public getRouter() {
        return this.router
    }

}