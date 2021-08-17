import { EColors } from "./enums";

export interface IToast {
	id?: number,
	color?: keyof EColors,
	timer?: number,
	light?: boolean,
	body: string
};