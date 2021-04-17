import {RequestHandler} from "express";
import {app} from "../index";

export class AuthAdmin {
	static check(req, res, next): RequestHandler {

		// parse login and password from headers
		const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
		const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

		// Verify login and password are set and correct
		if (login && password && login === app.locals._config.adminAuth.login && password === app.locals._config.adminAuth.password) {
			// Access granted...
			return next()
		}

		// Access denied...
		res.set('WWW-Authenticate', 'Basic realm="401"') // change this
		res.status(401).send('Authentication required.');
	}
}
