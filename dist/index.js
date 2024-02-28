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
const firebase_1 = require("./config/firebase");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const response_1 = require("./utils/response");
const role_routes_1 = require("./routes/role.routes");
const user_routes_1 = require("./routes/user.routes");
const role_user_routes_1 = require("./routes/role-user.routes");
const service_routes_1 = require("./routes/service.routes");
// init server (express)
const app = (0, express_1.default)()
    .use(express_1.default.json())
    .use((0, cors_1.default)());
// init firebase
(0, firebase_1.initFirebase)();
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
const port = 3000;
app.listen(port, () => {
    console.log('Server running in port:' + port);
});
