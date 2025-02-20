"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
class Server {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
    }
    // init express
    start() {
        return this.app;
    }
    /** listen  */
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running in port ${this.port}`);
        });
    }
}
exports.Server = Server;
