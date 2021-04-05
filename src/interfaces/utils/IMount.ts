import {Application, RequestHandler} from "express";

export interface IMount {
	init: (_app: Application) => (middleware: RequestHandler, cb: () => void) => Application;
}
