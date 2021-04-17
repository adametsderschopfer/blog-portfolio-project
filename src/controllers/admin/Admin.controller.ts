import {Request, Response} from "express";
import {getManager, Repository} from "typeorm";
import {Post} from "../../entity/Post.entity";
import {CreatePostDto} from "../../DTOs/post/create-post.dto";

export class AdminController {

	static GET_REPO__POST(): Repository<Post> {
		const data = getManager().getRepository(Post);

		return data
	}

	static async index(req: Request, res: Response): Promise<void> {
		res.redirect('/admin/posts') // TODO: REMOVE IF WILL BE ADD MORE PAGES ...
	}

	static async GET_getPosts(req: Request, res: Response): Promise<void> {
		const POSTS = await AdminController.GET_REPO__POST().find();

		res.render('admin/posts', {
			POSTS
		})
	}

	static async GET_newPost(req: Request, res: Response): Promise<void> {
		res.render('admin/add-post')
	}

	static async GET_editPost(req: Request, res: Response): Promise<void> {
		const id = req.query?.post_id.toString();

		if (!id)
			res.redirect('/admin/posts')

		const POST = await AdminController.GET_REPO__POST().findOne({id})

		res.render('admin/edit-post', {
			POST
		})
	}

	static async POST_newPost(req: Request, res: Response): Promise<void> {
		const body: CreatePostDto = req?.body;

		if (!body) res.end('Body is empty')

		const newPost = new Post();

		if (!body.content || !body.title || !body.description) throw 'Some field is undefined'

		newPost.description = body.description;
		newPost.title = body.title;
		newPost.content = body.content;

		await AdminController.GET_REPO__POST().save(newPost);

		res.redirect('/admin')
	}

	static async POST_editPost(req: Request, res: Response): Promise<void> {
		const body: CreatePostDto = req?.body;
		const id = req.query?.post_id.toString();

		if (!id)
			res.redirect('/admin/posts')

		if (!body.content || !body.title || !body.description) throw 'Some field is undefined'

		const obj = await AdminController.GET_REPO__POST().findOne(id);

		obj.description = body.description;
		obj.title = body.title;
		obj.content = body.content;

		await AdminController.GET_REPO__POST().save(obj);

		res.redirect('/admin')
	}

	static async POST_removePost(req: Request, res: Response): Promise<void> {
		const id = req.query?.post_id.toString();

		if (!id)
			res.redirect('/admin/posts')

		await AdminController.GET_REPO__POST().delete({id});

		res.redirect('/admin/posts')
	}

}
