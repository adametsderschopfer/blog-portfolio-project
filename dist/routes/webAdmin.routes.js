"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebAdminRoutes = void 0;
const express_1 = require("express");
const Log_1 = require("../middlewares/Log");
const AuthAdmin_1 = require("../middlewares/AuthAdmin");
const Admin_controller_1 = require("../controllers/admin/Admin.controller");
class WebAdminRoutes {
    constructor() {
        Log_1.default.info('[Routes] :: Booting Web {Admin} Routes...');
        this.router = express_1.Router();
    }
    init(_express) {
        this.router.use('/', AuthAdmin_1.AuthAdmin.check);
        this.router.get('/', Admin_controller_1.AdminController.index);
        this.router.get('/posts', Admin_controller_1.AdminController.GET_getPosts);
        this.router.get('/posts/new', Admin_controller_1.AdminController.GET_newPost);
        this.router.get('/posts/edit', Admin_controller_1.AdminController.GET_editPost);
        this.router.post('/posts/new', Admin_controller_1.AdminController.POST_newPost);
        this.router.get('/posts/remove', Admin_controller_1.AdminController.POST_removePost);
        this.router.post('/posts/edit', Admin_controller_1.AdminController.POST_editPost);
        _express.use('/admin', this.router);
    }
}
exports.WebAdminRoutes = WebAdminRoutes;
//# sourceMappingURL=webAdmin.routes.js.map