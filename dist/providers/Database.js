"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const Locals_1 = require("./Locals");
const Log_1 = require("../middlewares/Log");
const typeorm_1 = require("typeorm");
class Database {
    // Initialize your database pool
    static init() {
        const { databaseConnectionOptions } = Locals_1.default.config();
        Log_1.default.info('[TypeOrm] :: Start database connection...');
        Log_1.default.info('[TypeOrm] :: Database type: ' + databaseConnectionOptions.type);
        Log_1.default.info('[TypeOrm] :: Database name: ' + databaseConnectionOptions.database);
        return typeorm_1.createConnection(databaseConnectionOptions)
            .then(() => {
            Log_1.default.info('[TypeOrm] :: Database connected successful...');
        }, err => {
            throw err;
        })
            .catch(err => {
            Log_1.default.error('[TypeOrm] :: Something went wrong with database connection: ' + JSON.stringify(err));
            throw err;
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map