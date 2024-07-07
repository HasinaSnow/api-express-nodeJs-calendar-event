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
import { initFirebase } from './config/firebaseConfig';
import { createServer } from 'http';
import { Server }  from 'socket.io'
import { NotifRoutes } from './routes/notif.routes';
import { NotifService } from './services/notif.service';
import { getUidToken } from './utils/utils';
import { notifChannel } from './channel.socket';
import { User } from './models/user/user.model';
import { SocketService } from './services/socket.service';

// init server (express)
const app = express()
const server = createServer(app)

app
.use(cors())
.use(express.json())

// init firebase
initFirebase()

export const socket = new Server(server, { cors: { origin: "*"} })

// channel listen
socket.on('connection', (socketInstance) => {
  console.log('____logged____:', socketInstance.id);

  // received token
  socketInstance.on('token', async (token: string) => {
    console.log('____token received_____')
    try {
      const userId = await getUidToken(token)
      socketInstance.data = { userId: userId }

      // send notifs where read: false if exists
      notifChannel(socketInstance, userId)
    } catch (error) {
      socketInstance.emit('invalid_token', 'Invalid token or expired')
      socketInstance.disconnect()
    }
  })

  socket.on('disconnect', (socket) => {
    console.log('____loggout___:', socket);
  });
});


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
