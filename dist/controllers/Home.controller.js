"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
class HomeController {
    static index(req, res) {
        res.render('pages/main', {
            activePageID: 0,
        });
    }
}
exports.HomeController = HomeController;
//# sourceMappingURL=Home.controller.js.map