import {Router} from 'express'
import {HomeController} from "../controllers/Home.controller";
import {PostsController} from "../controllers/Posts.controller";
import Log from "../middlewares/Log";

export class WebRoutes {
	private router: Router;
	constructor() {
		Log.info('[Routes] :: Booting Web Routes...');

		this.router = Router();
	}
	                       
	init(_express) {
		this.router.get('/', HomeController.index)
		this.router.get('/posts', PostsController.postsPage)
		this.router.get('/posts/page', PostsController.currentPostPage)

		_express.use(this.router)
	}
}
