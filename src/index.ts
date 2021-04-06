import * as express from "express";
import {Application} from "express";
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as lusca from 'lusca';

import Locals from "./providers/Locals";
import {Database} from "./providers/Database";
import Routes from "./providers/Routes";
import ViewEngine from "./providers/ViewEngine";
import {AppStartMultithreading} from "./providers/AppStartMultithreading";
import Log from "./middlewares/Log";
import CORS from "./middlewares/CORS";
import Mount from "./utils/mount";

function initApplication(_app: Application): Promise<void> {
	Log.info('[Application] :: Start init.');

	const mountMiddleware = Mount.init(_app);

	Locals.init(_app);
	ViewEngine.mount(_app);
	mountMiddleware(lusca(), () => Log.info('[Middleware] :: Booting the \'lusca\'...'));
	CORS.mount(_app);
	mountMiddleware(compression(), () => Log.info('[Middleware] :: Booting the \'Compression\'...'));
	mountMiddleware(bodyParser.urlencoded({
		extended: true
	}), () => Log.info('[Middleware] :: Booting the \'bodyParser[urlencoded]\'...'));
	mountMiddleware(bodyParser.json({}), () => Log.info('[Middleware] :: Booting the \'bodyParser[json]\'...'));

	return Database.init();
}

function bootstrap(): void {
	Log.info('[Application] :: Booting Application...')
	const app: Application = express();

	initApplication(app)
		.then(() => {
			Log.info('[Application] :: Finish init.');

			Routes.mount(app)

			app.listen(app.locals._config.port, () => {
				Log.info('[Application] :: Server was started. PORT: ' + app.locals._config.port);
			});
		}, err => {
			Log.error('[Application] :: app was crashed. process exit with 0 code. Error reason: ' + JSON.stringify(err))
		})
		.finally(() => {
			Log.info('===============================================================');
		})
}

AppStartMultithreading.listen(bootstrap);
