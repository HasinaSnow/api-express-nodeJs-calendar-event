import { Router } from "express";
import { RoleUserController } from "../controllers/role-user.controller";

export class RoleUserRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post('/', (req, res) => {
            new RoleUserController(req, res).store()
        });

        this.router.get('/', (req, res) => {
            new RoleUserController(req, res).index()
        });

        this.router.get('/:id', (req, res) => {
            new RoleUserController(req, res).show()
        });

        this.router.put('/:id', (req, res) => {
            new RoleUserController(req, res).update()
        });

        this.router.delete('/:id', (req, res) => {
            new RoleUserController(req, res).delete()
        });

    }

    public getRouter() {
        return this.router
    }

}