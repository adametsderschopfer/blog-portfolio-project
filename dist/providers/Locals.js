"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const dotenv = require("dotenv");
const Log_1 = require("../middlewares/Log");
class Locals {
    /**
     * Makes env configs available for your app
     * throughout the app's runtime
     */
    static config() {
        dotenv.config({ path: path.join(__dirname, '../../.env') });
        const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
        const port = process.env.PORT || 4040;
        const databaseConnectionOptions = {
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "root",
            "database": "blog-portfolio",
            "synchronize": true,
            "entities": [
                "dist/entity/*.js"
            ],
            "migrations": [
                "dist/migration/*.js"
            ]
        };
        return {
            port,
            url,
            databaseConnectionOptions
        };
    }
    /**
     * Injects your config to the app's locals
     */
    static init(_express) {
        Log_1.default.info('[Locals] :: Initialized locals and injects to express.locals');
        _express.locals._config = this.config();
        return _express;
    }
}
exports.default = Locals;
//# sourceMappingURL=Locals.js.map