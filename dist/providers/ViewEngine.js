"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = require("../middlewares/Log");
const ejsLocals = require("ejs-locals");
const path = require("path");
class ViewEngine {
    mount(_express) {
        Log_1.default.info('[Middlewares] :: Booting the \'ViewEngine\'...');
        _express.engine('ejs', ejsLocals);
        _express.set('views', path.join(process.cwd() + '/views'));
        _express.set('view engine', 'ejs');
        return _express;
    }
}
exports.default = new ViewEngine;
//# sourceMappingURL=ViewEngine.js.map