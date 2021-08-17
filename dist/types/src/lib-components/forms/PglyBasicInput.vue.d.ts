import { PropType } from "@vue/runtime-core";
import { HTMLElementEvent } from "../../core/types";
import { IErrorInput } from "../../core/interfaces";
declare const _default: import("@vue/runtime-core").DefineComponent<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    tabindex: {
        type: NumberConstructor;
        default: number;
    };
    id: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: undefined;
    };
    tag: {
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
}, unknown, unknown, {
    mountClasses(): string;
    hasDescription(): boolean;
}, {
    onChanged(e: HTMLElementEvent<HTMLInputElement>): void;
}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    tabindex?: unknown;
    id?: unknown;
    type?: unknown;
    label?: unknown;
    tag?: unknown;
    placeholder?: unknown;
    required?: unknown;
    disabled?: unknown;
    error?: unknown;
} & {
    modelValue: string;
    tabindex: number;
    id: string;
    type: string;
    required: boolean;
    disabled: boolean;
    error: IErrorInput;
} & {
    label?: string | undefined;
    tag?: string | undefined;
    placeholder?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string;
    tabindex: number;
    type: string;
    label: string;
    tag: string;
    placeholder: string;
    required: boolean;
    disabled: boolean;
    error: IErrorInput;
}>;
export default _default;
