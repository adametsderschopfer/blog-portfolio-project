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
exports.AdminController = void 0;
const typeorm_1 = require("typeorm");
const Post_entity_1 = require("../../entity/Post.entity");
class AdminController {
    static GET_REPO__POST() {
        const data = typeorm_1.getManager().getRepository(Post_entity_1.Post);
        return data;
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.redirect('/admin/posts'); // TODO: REMOVE IF WILL BE ADD MORE PAGES ...
        });
    }
    static GET_getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const POSTS = yield AdminController.GET_REPO__POST().find();
            res.render('admin/posts', {
                POSTS
            });
        });
    }
    static GET_newPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('admin/add-post');
        });
    }
    static GET_editPost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const id = (_a = req.query) === null || _a === void 0 ? void 0 : _a.post_id.toString();
            if (!id)
                res.redirect('/admin/posts');
            const POST = yield AdminController.GET_REPO__POST().findOne({ id });
            res.render('admin/edit-post', {
                POST
            });
        });
    }
    static POST_newPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req === null || req === void 0 ? void 0 : req.body;
            if (!body)
                res.end('Body is empty');
            const newPost = new Post_entity_1.Post();
            if (!body.content || !body.title || !body.description)
                throw 'Some field is undefined';
            newPost.description = body.description;
            newPost.title = body.title;
            newPost.content = body.content;
            yield AdminController.GET_REPO__POST().save(newPost);
            res.redirect('/admin');
        });
    }
    static POST_editPost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const body = req === null || req === void 0 ? void 0 : req.body;
            const id = (_a = req.query) === null || _a === void 0 ? void 0 : _a.post_id.toString();
            if (!id)
                res.redirect('/admin/posts');
            if (!body.content || !body.title || !body.description)
                throw 'Some field is undefined';
            const obj = yield AdminController.GET_REPO__POST().findOne(id);
            obj.description = body.description;
            obj.title = body.title;
            obj.content = body.content;
            yield AdminController.GET_REPO__POST().save(obj);
            res.redirect('/admin');
        });
    }
    static POST_removePost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const id = (_a = req.query) === null || _a === void 0 ? void 0 : _a.post_id.toString();
            if (!id)
                res.redirect('/admin/posts');
            yield AdminController.GET_REPO__POST().delete({ id });
            res.redirect('/admin/posts');
        });
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=Admin.controller.js.map