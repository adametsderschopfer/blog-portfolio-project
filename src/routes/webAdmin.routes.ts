import {Application, Router} from 'express'
import Log from "../middlewares/Log";
import {AuthAdmin} from "../middlewares/AuthAdmin";
import {AdminController} from "../controllers/admin/Admin.controller";

export class WebAdminRoutes {
	private router: Router;
	constructor() {
		Log.info('[Routes] :: Booting Web {Admin} Routes...');

		this.router = Router();
	}

	init(_express: Application): void {
		this.router.use('/', AuthAdmin.check);

		this.router.get('/', AdminController.index);

		this.router.get('/posts', AdminController.GET_getPosts);
		this.router.get('/posts/new', AdminController.GET_newPost);
		this.router.get('/posts/edit', AdminController.GET_editPost);

		this.router.post('/posts/new', AdminController.POST_newPost);
		this.router.get('/posts/remove', AdminController.POST_removePost);
		this.router.post('/posts/edit', AdminController.POST_editPost);

		_express.use('/admin', this.router)
	}
}
