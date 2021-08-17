import { IErrorInput } from "../../core/interfaces";
import { PropType } from "@vue/runtime-core";
declare const _default: import("@vue/runtime-core").DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    tabindex: {
        type: NumberConstructor;
        default: number;
    };
    id: {
        type: StringConstructor;
        required: true;
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
}, unknown, unknown, {
    mountClasses(): string;
    mountCheckboxClasses(): string;
    hasDescription(): boolean;
}, {
    onChanged(checked: boolean): void;
}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    tabindex?: unknown;
    id?: unknown;
    label?: unknown;
    placeholder?: unknown;
    required?: unknown;
    disabled?: unknown;
    error?: unknown;
} & {
    modelValue: boolean;
    tabindex: number;
    id: string;
    required: boolean;
    disabled: boolean;
    error: IErrorInput;
} & {
    label?: string | undefined;
    placeholder?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: boolean;
    tabindex: number;
    label: string;
    placeholder: string;
    required: boolean;
    disabled: boolean;
    error: IErrorInput;
}>;
export default _default;
