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
exports.IncludeComponent = void 0;
const Log_1 = require("../middlewares/Log");
class IncludeComponent {
    constructor(_class, _express, safeCallee = true) {
        this._class = _class;
        this._express = _express;
        if (!_class) {
            const message = `[IncludeComponent:error]: argument '_class' is can't be undefined`;
            Log_1.default.error(message);
            throw new SyntaxError(message);
        }
        Log_1.default.info(`[IncludeComponent: ${_class.name}]: Booting including component...`);
        if (safeCallee) {
            this.use();
        }
    }
    use() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new this._class().use(this._express);
                Log_1.default.info(`[IncludeComponent: ${this._class.name}]: Component was included.`);
            }
            catch (err) {
                Log_1.default.error(`[IncludeComponent: ${this._class.name}]: ${err}`);
            }
            return this._express;
        });
    }
}
exports.IncludeComponent = IncludeComponent;
//# sourceMappingURL=IncludeComponent.js.map