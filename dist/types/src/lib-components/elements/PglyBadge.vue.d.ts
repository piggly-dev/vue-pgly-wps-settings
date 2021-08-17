import { PropType } from "@vue/runtime-core";
declare const _default: import("@vue/runtime-core").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    close: {
        type: PropType<() => void>;
        default: undefined;
    };
    light: {
        type: BooleanConstructor;
        default: boolean;
    };
    rounded: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {}, {
    onClose(): void;
}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    color?: unknown;
    size?: unknown;
    close?: unknown;
    light?: unknown;
    rounded?: unknown;
} & {
    color: string;
    size: string;
    light: boolean;
    rounded: boolean;
} & {
    close?: (() => void) | undefined;
}> & {}, {
    color: string;
    size: string;
    close: () => void;
    light: boolean;
    rounded: boolean;
}>;
export default _default;
