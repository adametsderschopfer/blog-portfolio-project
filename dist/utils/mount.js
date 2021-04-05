"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mount {
    init(_app) {
        return function (middleware, cb) {
            _app.use(middleware);
            if (cb)
                cb();
            return _app;
        };
    }
}
exports.default = new Mount();
//# sourceMappingURL=mount.js.map