import Locals from './Locals';
import Log from '../middlewares/Log';
import {createConnection} from "typeorm";

export class Database {
	// Initialize your database pool
	public static init(): Promise<void> {
		const {databaseConnectionOptions} = Locals.config();

		Log.info('[TypeOrm] :: Start database connection...')
		Log.info('[TypeOrm] :: Database type: ' + databaseConnectionOptions.type)
		Log.info('[TypeOrm] :: Database name: ' + databaseConnectionOptions.database)

		return createConnection(databaseConnectionOptions)
			.then(() => {
					Log.info('[TypeOrm] :: Database connected successful...');
				},
				err => {
					throw err;
				}
			)
			.catch(err => {
				Log.error('[TypeOrm] :: Something went wrong with database connection: ' + JSON.stringify(err));
				throw err;
			})
	}
}
