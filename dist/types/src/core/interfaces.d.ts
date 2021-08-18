import { EColors, ESizes } from "./enums";
export interface IBadge {
    id?: number;
    color?: EColors[keyof EColors];
    size?: ESizes[keyof ESizes];
    light?: boolean;
    rounded?: boolean;
    body: string;
}
export interface IField {
    error: IErrorInput;
    value: any;
    options?: Array<ISelectOption>;
}
export interface IErrorInput {
    state: boolean;
    message?: string;
}
export interface INavigatorItem {
    key: string;
    label: string;
    link?: string;
}
export interface INotification {
    id?: number;
    color?: EColors[keyof EColors];
    timer?: number;
    light?: boolean;
    body: string;
}
export interface ISelectOption {
    label: string;
    value: string;
}
export interface IToast {
    id?: number;
    color?: EColors[keyof EColors];
    timer?: number;
    light?: boolean;
    body: string;
}
