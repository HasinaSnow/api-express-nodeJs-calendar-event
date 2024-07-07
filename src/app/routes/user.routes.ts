import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post('/', (req, res) => {
            // new UserController(req, res).store()
        });

        this.router.get('/', (req, res) => {
            new UserController(req, res).index()
        });

        this.router.get('/:id', (req, res) => {
            new UserController(req, res).show()
        });

        this.router.put('/:id', (req, res) => {
            new UserController(req, res).update()
        });

        this.router.delete('/:id', (req, res) => {
            // new UserControllers(req, res).delete()
        });

    }

    public getRouter() {
        return this.router
    }

}