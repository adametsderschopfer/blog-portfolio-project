"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Locals_1 = require("./Locals");
const Log_1 = require("../middlewares/Log");
class Routes {
    mountWebAdmin(_express) {
        Log_1.default.info('[Routes] :: Mounting Admin Routes...');
        return _express; //.use('/', );
    }
    mountWeb(_express) {
        Log_1.default.info('[Routes] :: Mounting Web Routes...');
        return _express; //.use('/', );
    }
    mountApi(_express) {
        const apiPrefix = Locals_1.default.config().apiVersion;
        Log_1.default.info('[Routes] :: Mounting API Routes...');
        return _express; //.use(`/${apiPrefix}`, );
    }
    mount(_express) {
        const fabricOfMount = [this.mountApi, this.mountWeb, this.mountWebAdmin];
        fabricOfMount.map((mount) => mount(_express));
    }
}
exports.default = new Routes;
//# sourceMappingURL=Routes.js.map