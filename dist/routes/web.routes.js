"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebRoutes = void 0;
const express_1 = require("express");
const Home_controller_1 = require("../controllers/Home.controller");
const Posts_controller_1 = require("../controllers/Posts.controller");
const Log_1 = require("../middlewares/Log");
class WebRoutes {
    constructor() {
        Log_1.default.info('[Routes] :: Booting Web Routes...');
        this.router = express_1.Router();
    }
    init(_express) {
        this.router.get('/', Home_controller_1.HomeController.index);
        this.router.get('/posts', Posts_controller_1.PostsController.postsPage);
        this.router.get('/posts/page', Posts_controller_1.PostsController.currentPostPage);
        _express.use(this.router);
    }
}
exports.WebRoutes = WebRoutes;
//# sourceMappingURL=web.routes.js.map