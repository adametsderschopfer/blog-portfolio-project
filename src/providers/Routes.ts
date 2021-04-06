import {Application} from 'express';
import Locals from './Locals';
import Log from '../middlewares/Log';

type TRouterMountFunc = (_express: Application) => Application;

class Routes {
	private mountWebAdmin(_express: Application): Application {
		Log.info('[Routes] :: Mounting Admin Routes...');

		return _express//.use('/', );
	}

	private mountWeb(_express: Application): Application {
		Log.info('[Routes] :: Mounting Web Routes...');

		return _express//.use('/', );
	}

	private mountApi(_express: Application): Application {
		const apiPrefix = Locals.config().apiVersion;
		Log.info('[Routes] :: Mounting API Routes...');

		return _express//.use(`/${apiPrefix}`, );
	}

	public mount(_express: Application): void {
		const fabricOfMount = [this.mountApi, this.mountWeb, this.mountWebAdmin];

		fabricOfMount.map<Application>((mount: TRouterMountFunc) => mount(_express))
	}
}

export default new Routes;
