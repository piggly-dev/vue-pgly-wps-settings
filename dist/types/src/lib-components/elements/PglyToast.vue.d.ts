import { PropType } from "@vue/runtime-core";
declare const _default: import("@vue/runtime-core").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    close: {
        type: PropType<() => void>;
        default: undefined;
    };
    timer: {
        type: NumberConstructor;
        default: number;
    };
    light: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {}, {
    onClose(): void;
}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    color?: unknown;
    close?: unknown;
    timer?: unknown;
    light?: unknown;
} & {
    color: string;
    timer: number;
    light: boolean;
} & {
    close?: (() => void) | undefined;
}> & {}, {
    color: string;
    close: () => void;
    timer: number;
    light: boolean;
}>;
export default _default;
