import { Router } from "express";
import { AccountController } from "../controllers/account.controller";

export class AccountRoutes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post('/signup', (req, res) => {
            new AccountController(req, res).signup()
        })
        this.router.post('/signin', (req, res) => {
            new AccountController(req, res).signin()
        })
        this.router.post('/signout', (req, res) => {
            new AccountController(req, res).signout()
        })
    }

    public getRouter() {
        return this.router
    }
}