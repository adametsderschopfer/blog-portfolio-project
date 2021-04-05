import {Application, RequestHandler} from "express";
import {IMount} from "../interfaces/utils/IMount";

class Mount implements IMount {
	init(_app: Application): (middleware: RequestHandler, cb: () => void) => Application {
		return function(middleware: RequestHandler, cb: () => void): Application {
			_app.use(middleware);
			if (cb) cb();
			
			return _app;             
		}
	}                                 
}

export default new Mount();
