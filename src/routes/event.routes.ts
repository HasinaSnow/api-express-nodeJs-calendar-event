import { Router } from 'express';
import { EventController } from '../controllers/event.controller';

export class EventRoutes {

    private router: Router

    constructor() {
        this.router = Router();
        this.initRoutes();
      }

    private initRoutes() {
        this.router.post('/', (req, res) => {
            new EventController(req, res).store()
        });

        this.router.get('/', (req, res) => {
            new EventController(req, res).index()
        });

        this.router.get('/:id', (req, res) => {
            new EventController(req, res).show()
        });

        this.router.put('/:id', (req, res) => {
            new EventController(req, res).update()
        });

        this.router.delete('/:id', (req, res) => {
            new EventController(req, res).delete()
        });
    }

    public getRouter() {
        return this.router
    }

}