import { Router } from "express";
import { RoleController } from "../controllers/role.controller";

export class RoleRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post('/', (req, res) => {
            new RoleController(req, res).store()
        });

        this.router.get('/', (req, res) => {
            new RoleController(req, res).index()
        });

        this.router.get('/:id', (req, res) => {
            new RoleController(req, res).show()
        });

        this.router.put('/:id', (req, res) => {
            new RoleController(req, res).update()
        });

        this.router.delete('/:id', (req, res) => {
            new RoleController(req, res).delete()
        });

    }

    public getRouter() {
        return this.router
    }

}