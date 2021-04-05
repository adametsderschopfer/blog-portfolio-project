"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mount = void 0;
class Mount {
    static init(_app) {
        return function (middleware, cb) {
            _app.use(middleware);
            if (cb)
                cb();
            return _app;
        };
    }
}
exports.Mount = Mount;
//# sourceMappingURL=mount.js.map