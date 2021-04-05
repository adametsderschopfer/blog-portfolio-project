"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const lusca = require("lusca");
const Locals_1 = require("./providers/Locals");
const Database_1 = require("./providers/Database");
const AppStartMultithreading_1 = require("./providers/AppStartMultithreading");
const Log_1 = require("./middlewares/Log");
const CORS_1 = require("./middlewares/CORS");
const mount_1 = require("./utils/mount");
function initApplication(_app) {
    const mountMiddleware = mount_1.Mount.init(_app);
    mountMiddleware(lusca(), () => Log_1.default.info('[Middleware] :: Booting the \'lusca\'...'));
    CORS_1.default.mount(_app);
    mountMiddleware(compression(), () => Log_1.default.info('[Middleware] :: Booting the \'Compression\'...'));
    mountMiddleware(bodyParser.json(), () => Log_1.default.info('[Middleware] :: Booting the \'bodyParser[JSON]\'...'));
    Locals_1.default.init(_app);
    Database_1.Database.init();
    return Promise.resolve();
}
function bootstrap() {
    Log_1.default.info('[Application] :: Booting Application...');
    const app = express();
    initApplication(app)
        .then(() => Log_1.default.info('[Application] :: was initialized.'));
    app.listen(app.locals.port, () => {
        Log_1.default.info('[Application] :: was started. PORT: ' + app.locals.port);
    });
    Log_1.default.info('===============================================================');
}
AppStartMultithreading_1.AppStartMultithreading.listen(bootstrap);
//# sourceMappingURL=index.js.map