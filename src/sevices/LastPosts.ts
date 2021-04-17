import {Application} from "express";
import {IComponent} from "../interfaces/provides/IncludeComponent";
import {getManager} from "typeorm";
import {Post} from "../entity/Post.entity";

class LastPosts implements IComponent {
	use(_express: Application): Promise<Application> {
		return new Promise<Application>(async (res, rej) => {
			try {
				const posts = await getManager().getRepository(Post).find() || [];
				const lastDeveloperPosts = posts.slice(0, 3);

				_express.locals.lastDeveloperPosts = lastDeveloperPosts;

				res()
			} catch (err) {
				rej(err);
			}
		})
	}

	static update(_express: Application) {
		return new Promise<Application>(async (res, rej) => {
			try {
				const posts = await getManager().getRepository(Post).find() || [];
				const lastDeveloperPosts = posts.slice(0, 3);

				_express.locals.lastDeveloperPosts = lastDeveloperPosts;

				res()
			} catch (err) {
				rej(err);
			}
		})
	}
}

export default LastPosts;
