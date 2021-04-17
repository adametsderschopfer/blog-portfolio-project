"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const lusca = require("lusca");
const Locals_1 = require("./providers/Locals");
const Database_1 = require("./providers/Database");
const Routes_1 = require("./providers/Routes");
const ViewEngine_1 = require("./providers/ViewEngine");
const AppStartMultithreading_1 = require("./providers/AppStartMultithreading");
const Log_1 = require("./middlewares/Log");
const CORS_1 = require("./middlewares/CORS");
const mount_1 = require("./utils/mount");
const LastPosts_1 = require("./sevices/LastPosts");
const IncludeComponent_1 = require("./providers/IncludeComponent");
exports.app = express();
function initApplication(_app) {
    Log_1.default.info('[Application] :: Start init.');
    const mountMiddleware = mount_1.default.init(_app);
    Locals_1.default.init(_app);
    ViewEngine_1.default.mount(_app);
    mountMiddleware(lusca(), () => Log_1.default.info('[Middleware] :: Booting the \'lusca\'...'));
    CORS_1.default.mount(_app);
    mountMiddleware(compression(), () => Log_1.default.info('[Middleware] :: Booting the \'Compression\'...'));
    mountMiddleware(bodyParser.urlencoded({
        extended: true
    }), () => Log_1.default.info('[Middleware] :: Booting the \'bodyParser[urlencoded]\'...'));
    mountMiddleware(bodyParser.json({}), () => Log_1.default.info('[Middleware] :: Booting the \'bodyParser[json]\'...'));
    return Database_1.Database.init();
}
function bootstrap() {
    Log_1.default.info('[Application] :: Booting Application...');
    initApplication(exports.app)
        .then(() => {
        Log_1.default.info('[Application] :: Finish init.');
        new IncludeComponent_1.IncludeComponent(LastPosts_1.default, exports.app);
        Routes_1.default.mount(exports.app);
        exports.app.listen(exports.app.locals._config.port, () => {
            Log_1.default.info('[Application] :: Server was started. PORT: ' + exports.app.locals._config.port);
        });
    }, err => {
        Log_1.default.error('[Application] :: app was crashed. process exit with 0 code. Error reason: ' + JSON.stringify(err));
    })
        .finally(() => {
        Log_1.default.info('===============================================================');
    });
}
AppStartMultithreading_1.AppStartMultithreading.listen(bootstrap);
//# sourceMappingURL=index.js.map