import {Application, static as express_static}  from 'express';
import Locals from './Locals';
import Log from '../middlewares/Log';
import {WebRoutes} from "../routes/web.routes";
import * as path from "path";
import {WebAdminRoutes} from "../routes/webAdmin.routes";
import LastPosts from "../sevices/LastPosts";

type TRouterMountFunc = (_express: Application) => Application;

class Routes {
	private mountWebAdmin(_express: Application): Application {
		Log.info('[Routes] :: Mounting Admin Routes...');
		new WebAdminRoutes().init(_express);
		Log.info('[Routes] :: Web {Admin} Routes initialized...');

		return _express
	}                          

	private mountPublic(_express: Application): Application {
		Log.info('[Routes] :: Mounting "Public files" Routes...');
		_express.use(express_static(path.join(process.cwd(), 'public')));
		Log.info('[Routes] :: "Public files" Routes initialized...');

		return _express
	}

	private mountWeb(_express: Application): Application {
		Log.info('[Routes] :: Mounting Web Routes...');
		new WebRoutes().init(_express);
		_express.use('*', (a, b, next) => {
			LastPosts.update(_express);
			next();
		})
		Log.info('[Routes] :: Web Routes initialized...');

		return _express
	}

	private mountApi(_express: Application): Application {
		const apiPrefix = Locals.config().apiVersion;
		Log.info('[Routes] :: Mounting API Routes...');

		return _express
	}

	private mountSystem(_express: Application): Application {
		_express.use('*', (_, res) => {
			res.status(404).end('<h1 style="margin: 25px 15px;">404 SOMETHING WENT WRONG</h1>')
		})

		return _express
	}

	public mount(_express: Application): void {
		const fabricOfMount = [this.mountApi, this.mountWeb, this.mountWebAdmin, this.mountPublic, this.mountSystem];

		fabricOfMount.map<Application>((mount: TRouterMountFunc) => mount(_express))
	}
}

export default new Routes;
