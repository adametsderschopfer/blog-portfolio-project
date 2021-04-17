"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdmin = void 0;
const index_1 = require("../index");
class AuthAdmin {
    static check(req, res, next) {
        // parse login and password from headers
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
        // Verify login and password are set and correct
        if (login && password && login === index_1.app.locals._config.adminAuth.login && password === index_1.app.locals._config.adminAuth.password) {
            // Access granted...
            return next();
        }
        // Access denied...
        res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
        res.status(401).send('Authentication required.');
    }
}
exports.AuthAdmin = AuthAdmin;
//# sourceMappingURL=AuthAdmin.js.map