import {Application} from "express";
import Log from "../middlewares/Log";
import * as ejsLocals from 'ejs-locals'
import * as path from "path";

class ViewEngine {
	  mount(_express: Application): Application {
			Log.info('[Middlewares] :: Booting the \'ViewEngine\'...');

			_express.engine('ejs', ejsLocals);
			_express.set('views', path.join(process.cwd() + '/views'));
			_express.set('view engine', 'ejs');

			return _express;
		}
}

export default new ViewEngine;
