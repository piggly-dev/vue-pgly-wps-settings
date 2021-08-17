import { EColors, ESizes } from "./enums";

export interface IBadge {
	id?: number,
	color?: keyof EColors,
	size?: keyof ESizes,
	light?: boolean,
	rounded?: boolean,
	body: string
};

export interface INotification {
	id?: number,
	color?: keyof EColors,
	timer?: number,
	light?: boolean,
	body: string
};

export interface IToast {
	id?: number,
	color?: keyof EColors,
	timer?: number,
	light?: boolean,
	body: string
};