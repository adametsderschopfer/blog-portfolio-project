import {Request, Response} from "express";
import {Post} from "../entity/Post.entity";
import {getManager} from "typeorm";
import Log from "../middlewares/Log";

export class PostsController {
	static async postsPage (req: Request, res: Response) {
		const postRepository = getManager().getRepository(Post);
		try {
			const POSTS = await postRepository.find();
			res.render('pages/posts',{
				POSTS,
				activePageID: 1
			})
		}
		catch (err) {
		 	res.redirect('/')
		}
	}

	static async currentPostPage(req: Request, res: Response) {
		if (!('post_id' in req.query)) res.redirect('/posts')
		let POST;

		const postRepository = getManager().getRepository(Post);

		try {
			POST = await postRepository.findOne({id: req.query.post_id.toString()});

			res.render('pages/post', {
				POST,
				activePageID: 1.1
			});

		}
		catch (err) {
			res.redirect('/posts')
		}

		try {
			await postRepository.save({
				...POST,
				views: POST.views + 1
			})
		} catch (err) {
		 	Log.error(`[METHOD: PostsController.currentPostPage]: ${err}`)
		}
	}
}
