import {Application} from "express";

export interface IIncludeComponent {
	use(): Promise<Application>;
}

export interface IComponentConstructor {
	new (): IComponent;
}

export interface IComponent {
	use(_express: Application): Promise<Application>;
}
