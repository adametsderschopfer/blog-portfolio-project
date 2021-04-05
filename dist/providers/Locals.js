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
        const mongooseUrl = process.env.MONGOOSE_URL;
        return {
            mongooseUrl,
            port,
            url,
        };
    }
    /**
     * Injects your config to the app's locals
     */
    static init(_express) {
        Log_1.default.info('[Locals] :: locals was init');
        _express.locals.app = this.config();
        return _express;
    }
}
exports.default = Locals;
//# sourceMappingURL=Locals.js.map