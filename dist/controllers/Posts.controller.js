"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const Post_entity_1 = require("../entity/Post.entity");
const typeorm_1 = require("typeorm");
const Log_1 = require("../middlewares/Log");
class PostsController {
    static postsPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postRepository = typeorm_1.getManager().getRepository(Post_entity_1.Post);
            try {
                const POSTS = yield postRepository.find();
                res.render('pages/posts', {
                    POSTS,
                    activePageID: 1
                });
            }
            catch (err) {
                res.redirect('/');
            }
        });
    }
    static currentPostPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!('post_id' in req.query))
                res.redirect('/posts');
            let POST;
            const postRepository = typeorm_1.getManager().getRepository(Post_entity_1.Post);
            try {
                POST = yield postRepository.findOne({ id: req.query.post_id.toString() });
                res.render('pages/post', {
                    POST,
                    activePageID: 1.1
                });
            }
            catch (err) {
                res.redirect('/posts');
            }
            try {
                yield postRepository.save(Object.assign(Object.assign({}, POST), { views: POST.views + 1 }));
            }
            catch (err) {
                Log_1.default.error(`[METHOD: PostsController.currentPostPage]: ${err}`);
            }
        });
    }
}
exports.PostsController = PostsController;
//# sourceMappingURL=Posts.controller.js.map