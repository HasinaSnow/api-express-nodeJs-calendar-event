import express from 'express'
import cors from 'cors'
import { EventRoutes } from './routes/event.routes';
import { CategRoutes } from './routes/categ.routes';

// init server (express)
const app = express()
    .use(express.json())
    .use(cors());

// listen route
app.use('/events', new EventRoutes().getRouter())
app.use('/categs', new CategRoutes().getRouter())

// listen port
const port = 3000
app.listen(port, () => {
    console.log('Server running in port:' + port)
})
