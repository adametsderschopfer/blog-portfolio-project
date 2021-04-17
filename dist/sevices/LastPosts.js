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
const typeorm_1 = require("typeorm");
const Post_entity_1 = require("../entity/Post.entity");
class LastPosts {
    use(_express) {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = (yield typeorm_1.getManager().getRepository(Post_entity_1.Post).find()) || [];
                const lastDeveloperPosts = posts.slice(0, 3);
                _express.locals.lastDeveloperPosts = lastDeveloperPosts;
                res();
            }
            catch (err) {
                rej(err);
            }
        }));
    }
    static update(_express) {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = (yield typeorm_1.getManager().getRepository(Post_entity_1.Post).find()) || [];
                const lastDeveloperPosts = posts.slice(0, 3);
                _express.locals.lastDeveloperPosts = lastDeveloperPosts;
                res();
            }
            catch (err) {
                rej(err);
            }
        }));
    }
}
exports.default = LastPosts;
//# sourceMappingURL=LastPosts.js.map