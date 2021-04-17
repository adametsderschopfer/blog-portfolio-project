"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Locals_1 = require("./Locals");
const Log_1 = require("../middlewares/Log");
const web_routes_1 = require("../routes/web.routes");
const path = require("path");
const webAdmin_routes_1 = require("../routes/webAdmin.routes");
const LastPosts_1 = require("../sevices/LastPosts");
class Routes {
    mountWebAdmin(_express) {
        Log_1.default.info('[Routes] :: Mounting Admin Routes...');
        new webAdmin_routes_1.WebAdminRoutes().init(_express);
        Log_1.default.info('[Routes] :: Web {Admin} Routes initialized...');
        return _express;
    }
    mountPublic(_express) {
        Log_1.default.info('[Routes] :: Mounting "Public files" Routes...');
        _express.use(express_1.static(path.join(process.cwd(), 'public')));
        Log_1.default.info('[Routes] :: "Public files" Routes initialized...');
        return _express;
    }
    mountWeb(_express) {
        Log_1.default.info('[Routes] :: Mounting Web Routes...');
        new web_routes_1.WebRoutes().init(_express);
        _express.use('*', (a, b, next) => {
            LastPosts_1.default.update(_express);
            next();
        });
        Log_1.default.info('[Routes] :: Web Routes initialized...');
        return _express;
    }
    mountApi(_express) {
        const apiPrefix = Locals_1.default.config().apiVersion;
        Log_1.default.info('[Routes] :: Mounting API Routes...');
        return _express;
    }
    mountSystem(_express) {
        _express.use('*', (_, res) => {
            res.status(404).end('<h1 style="margin: 25px 15px;">404 SOMETHING WENT WRONG</h1>');
        });
        return _express;
    }
    mount(_express) {
        const fabricOfMount = [this.mountApi, this.mountWeb, this.mountWebAdmin, this.mountPublic, this.mountSystem];
        fabricOfMount.map((mount) => mount(_express));
    }
}
exports.default = new Routes;
//# sourceMappingURL=Routes.js.map