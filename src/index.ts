import * as express from "express";
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as lusca from 'lusca';

import Locals from "./providers/Locals";
import {Database} from "./providers/Database";
import {AppStartMultithreading} from "./providers/AppStartMultithreading";
import Log from "./middlewares/Log";
import CORS from "./middlewares/CORS";
import {Mount} from "./utils/mount";
import {Application} from "express";

function initApplication(_app: Application): Promise<void> {
	const mountMiddleware = Mount.init(_app);

	mountMiddleware(lusca(), () => Log.info('[Middleware] :: Booting the \'lusca\'...'));
	CORS.mount(_app);
	mountMiddleware(compression(), () => Log.info('[Middleware] :: Booting the \'Compression\'...'));
	mountMiddleware(bodyParser.json(), () => Log.info('[Middleware] :: Booting the \'bodyParser[JSON]\'...'));
	Locals.init(_app);
	Database.init();
	                             
	return Promise.resolve();
}

function bootstrap(): void {
	Log.info('[Application] :: Booting Application...')
	const app: Application = express();

	initApplication(app)
		.then(() => Log.info('[Application] :: was initialized.'));

	app.listen(app.locals.port, () => {
		Log.info('[Application] :: was started. PORT: ' + app.locals.port);
	});

	Log.info('===============================================================');
}

AppStartMultithreading.listen(bootstrap);
