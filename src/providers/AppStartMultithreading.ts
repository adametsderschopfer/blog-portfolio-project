import * as os from 'os';
import * as cluster from 'cluster';
import Log from "../middlewares/Log";

export class AppStartMultithreading {
    private static cores = os.cpus().length;

    public static listen(_bootstrap: () => void) {
        Log.info('===============================================================');

        if (cluster.isMaster) {
            for (let i = 0; i < this.cores; i++) {
                Log.info('[Cluster] :: fork cluster pid: ' + process.pid);
                cluster.fork();
            }
        } else {
            Log.info('[Cluster] :: Booted process pid: ' + process.pid);
            _bootstrap();
        }
    }
}
