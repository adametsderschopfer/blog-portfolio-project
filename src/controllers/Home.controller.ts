import {Request, Response} from "express";

export class HomeController {
	static index(req: Request, res: Response) {
		res.render('pages/main', {
			activePageID: 0,
		})
	}                     
}
