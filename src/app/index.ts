import express from 'express'
import cors from 'cors'
import { EventRoutes } from './routes/event.routes';
import { CategRoutes } from './routes/categ.routes';
import { AccountRoutes } from './routes/account.routes';
import { SubscriberRoutes } from './routes/subscriber.routes';
import { authMiddleware } from './middlewares/auth.middleware';
import { ResponseService } from './utils/response';
import { RoleRoutes } from './routes/role.routes';
import { UserRoutes } from './routes/user.routes';
import { RoleUserRoutes } from './routes/role-user.routes';
import { ServiceRoutes } from './routes/service.routes';
import { ServiceUserRoutes } from './routes/service-user.routes';
import { initFirebase } from './config/firebaseConfig';
import { createServer } from 'http';
import { Server }  from 'socket.io'
import { NotifRoutes } from './routes/notif.routes';
import { EventServiceRoutes } from './routes/event-service.routes';

// init server (express)
const app = express()
const server = createServer(app)

app
.use(cors())
// .use(express.json())

const socket = new Server(server, {
  cors: {
    origin: "*"
  }
})

// channel listen
socket.on('connection', (socket) => {
  console.log('Nouvelle connexion:', socket.id);
  socket.emit('isConnected', 'Api rest calendar event')

  // Gérer les événements de socket ici

  socket.on('disconnect', () => {
    socket.emit('isDisconnected', 'Api rest calendar event')
    console.log('Déconnexion:', socket.id);
  });
});


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
app.use('/services', new ServiceRoutes().getRouter())
app.use('/service_users', new ServiceUserRoutes().getRouter())
app.use('/event_services', new EventServiceRoutes().getRouter())
app.use('/notifs', new NotifRoutes().getRouter())

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
const port = process.env.APP_PORT
server.listen(port, () => {
    console.log('Server running in port:' + port)
})

export default app
