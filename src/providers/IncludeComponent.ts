import {IComponentConstructor, IIncludeComponent} from "../interfaces/provides/IncludeComponent";
import {Application} from "express";
import Log from "../middlewares/Log";

export class IncludeComponent implements IIncludeComponent {
	constructor(private _class: IComponentConstructor, private _express: Application, safeCallee: Boolean = true) {
		if (!_class) {
			const message: string = `[IncludeComponent:error]: argument '_class' is can't be undefined`;
			Log.error(message);
			throw new SyntaxError(message);
		}

		Log.info(`[IncludeComponent: ${_class.name}]: Booting including component...`);

		if (safeCallee) {
			this.use();
		}
	}

	public async use(): Promise<Application> {
		try {
			await new this._class().use(this._express);
			Log.info(`[IncludeComponent: ${this._class.name}]: Component was included.`);
		}	catch(err) {
			Log.error(`[IncludeComponent: ${this._class.name}]: ${err}`);
		}

		return this._express;
	}
}
                            
