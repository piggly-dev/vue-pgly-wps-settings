import { IErrorInput, ISelectOption } from "../../core/interfaces";
import { PropType } from "@vue/runtime-core";
declare const _default: import("@vue/runtime-core").DefineComponent<{
    modelValue: {
        type: StringConstructor;
        default: undefined;
    };
    id: {
        type: StringConstructor;
        required: true;
    };
    options: {
        type: PropType<ISelectOption[]>;
        default: never[];
    };
    tabindex: {
        type: NumberConstructor;
        default: number;
    };
    label: {
        type: StringConstructor;
        default: undefined;
    };
    placeholder: {
        type: StringConstructor;
        default: undefined;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    error: {
        type: PropType<IErrorInput>;
        default: {
            state: boolean;
        };
    };
}, unknown, {
    open: boolean;
}, {
    mountClasses(): string;
    getLabel(): string;
    hasDescription(): boolean;
}, {
    onOpenSelect(): void;
    onClickItem(option: ISelectOption): void;
}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, ("update:modelValue" | "afterChange")[], "update:modelValue" | "afterChange", import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    id?: unknown;
    options?: unknown;
    tabindex?: unknown;
    label?: unknown;
    placeholder?: unknown;
    required?: unknown;
    disabled?: unknown;
    error?: unknown;
} & {
    id: string;
    options: ISelectOption[];
    tabindex: number;
    required: boolean;
    disabled: boolean;
    error: IErrorInput;
} & {
    modelValue?: string | undefined;
    label?: string | undefined;
    placeholder?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onAfterChange?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string;
    options: ISelectOption[];
    tabindex: number;
    label: string;
    placeholder: string;
    required: boolean;
    disabled: boolean;
    error: IErrorInput;
}>;
export default _default;
