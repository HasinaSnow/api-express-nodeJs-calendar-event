"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const event_routes_1 = require("./routes/event.routes");
const categ_routes_1 = require("./routes/categ.routes");
const account_routes_1 = require("./routes/account.routes");
const subscriber_routes_1 = require("./routes/subscriber.routes");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const response_1 = require("./utils/response");
const role_routes_1 = require("./routes/role.routes");
const user_routes_1 = require("./routes/user.routes");
const role_user_routes_1 = require("./routes/role-user.routes");
const service_routes_1 = require("./routes/service.routes");
const service_user_routes_1 = require("./routes/service-user.routes");
const firebaseConfig_1 = require("./config/firebaseConfig");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const notif_routes_1 = require("./routes/notif.routes");
const event_service_routes_1 = require("./routes/event-service.routes");
// init server (express)
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app
    .use((0, cors_1.default)());
// .use(express.json())
const socket = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
// channel listen
socket.on('connection', (socket) => {
    console.log('Nouvelle connexion:', socket.id);
    socket.emit('isConnected', 'Api rest calendar event');
    // Gérer les événements de socket ici
    socket.on('disconnect', () => {
        socket.emit('isDisconnected', 'Api rest calendar event');
        console.log('Déconnexion:', socket.id);
    });
});
// init firebase
(0, firebaseConfig_1.initFirebase)();
// listen routes
app.use('/account', new account_routes_1.AccountRoutes().getRouter());
// auth
app.use(auth_middleware_1.authMiddleware);
app.use('/events', new event_routes_1.EventRoutes().getRouter());
app.use('/categs', new categ_routes_1.CategRoutes().getRouter());
app.use('/subscribers', new subscriber_routes_1.SubscriberRoutes().getRouter());
app.use('/roles', new role_routes_1.RoleRoutes().getRouter());
app.use('/role_users', new role_user_routes_1.RoleUserRoutes().getRouter());
app.use('/users', new user_routes_1.UserRoutes().getRouter());
app.use('/services', new service_routes_1.ServiceRoutes().getRouter());
app.use('/service_users', new service_user_routes_1.ServiceUserRoutes().getRouter());
app.use('/event_services', new event_service_routes_1.EventServiceRoutes().getRouter());
app.use('/notifs', new notif_routes_1.NotifRoutes().getRouter());
// 404 not found
app.use(function (req, res, next) {
    new response_1.ResponseService(res, 'Url').notFound();
    next();
});
// error handler
app.use(function (req, res, next) {
    new response_1.ResponseService(res).errorServer('Internal server error.');
});
// listen port
const port = process.env.APP_PORT;
server.listen(port, () => {
    console.log('Server running in port:' + port);
});
exports.default = app;
