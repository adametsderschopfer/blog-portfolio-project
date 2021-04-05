"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStartMultithreading = void 0;
const os = require("os");
const cluster = require("cluster");
const Log_1 = require("../middlewares/Log");
class AppStartMultithreading {
    static listen(_bootstrap) {
        Log_1.default.info('===============================================================');
        if (cluster.isMaster) {
            for (let i = 0; i < this.cores; i++) {
                Log_1.default.info('[Cluster] :: fork cluster pid: ' + process.pid);
                cluster.fork();
            }
        }
        else {
            Log_1.default.info('[Cluster] :: Booted process pid: ' + process.pid);
            _bootstrap();
        }
    }
}
exports.AppStartMultithreading = AppStartMultithreading;
AppStartMultithreading.cores = os.cpus().length;
//# sourceMappingURL=AppStartMultithreading.js.map