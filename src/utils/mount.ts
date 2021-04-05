import {Application, RequestHandler} from "express";

export class Mount {
	public static init(_app): (middleware: RequestHandler, cb: () => void) => Application {
		return function(middleware: RequestHandler, cb: () => void): Application {
			_app.use(middleware);
			if (cb) cb();
			
			return _app;             
		}
	}                                 
}
