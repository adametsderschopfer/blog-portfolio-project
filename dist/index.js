"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    const app = express();
    initApplication(app)
        .then(() => {
        Log_1.default.info('[Application] :: Finish init.');
        Routes_1.default.mount(app);
        app.listen(app.locals._config.port, () => {
            Log_1.default.info('[Application] :: Server was started. PORT: ' + app.locals._config.port);
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