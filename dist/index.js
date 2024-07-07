"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
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
const firebaseConfig_1 = require("./config/firebaseConfig");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const notif_routes_1 = require("./routes/notif.routes");
const utils_1 = require("./utils/utils");
const channel_socket_1 = require("./channel.socket");
// init server (express)
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app
    .use((0, cors_1.default)())
    .use(express_1.default.json());
// init firebase
(0, firebaseConfig_1.initFirebase)();
exports.socket = new socket_io_1.Server(server, { cors: { origin: "*" } });
// channel listen
exports.socket.on('connection', (socketInstance) => {
    console.log('____logged____:', socketInstance.id);
    // received token
    socketInstance.on('token', (token) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('____token received_____');
        try {
            const userId = yield (0, utils_1.getUidToken)(token);
            socketInstance.data = { userId: userId };
            // send notifs where read: false if exists
            (0, channel_socket_1.notifChannel)(socketInstance, userId);
        }
        catch (error) {
            socketInstance.emit('invalid_token', 'Invalid token or expired');
            socketInstance.disconnect();
        }
    }));
    exports.socket.on('disconnect', (socket) => {
        console.log('____loggout___:', socket);
    });
});
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
