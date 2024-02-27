import express from 'express'
import cors from 'cors'
import { EventRoutes } from './routes/event.routes';
import { CategRoutes } from './routes/categ.routes';
import { AccountRoutes } from './routes/account.routes';
import { SubscriberRoutes } from './routes/subscriber.routes';
import { initFirebase } from './config/firebase';
import { authMiddleware } from './middlewares/auth.middleware';
import { ResponseService } from './utils/response';
import { RoleRoutes } from './routes/role.routes';
import { UserRoutes } from './routes/user.routes';
import { RoleUserRoutes } from './routes/role-user.routes';

// init server (express)
const app = express()
    .use(express.json())
    .use(cors());

// init firebase
initFirebase()

// listen routes
app.use('/account', new AccountRoutes().getRouter())

// auth
app.use(authMiddleware)
app.use('/events', new EventRoutes().getRouter())
app.use('/categs', new CategRoutes().getRouter())
app.use('/subscribers', new SubscriberRoutes().getRouter())
app.use('/roles', new RoleRoutes().getRouter())
app.use('/role_users', new RoleUserRoutes().getRouter())
app.use('/users', new UserRoutes().getRouter())

// 404 not found
app.use(function (req, res, next) {
    new ResponseService(res, 'Url').notFound()
    next();
  });

  // error handler
  app.use(function (req, res, next) {
    new ResponseService(res).errorServer('Internal server error.')
  });

// listen port
const port = 3000
app.listen(port, () => {
    console.log('Server running in port:' + port)
})
