import { PropType } from "@vue/runtime-core";
declare const _default: import("@vue/runtime-core").DefineComponent<{
    action: {
        type: PropType<() => Promise<void>>;
        required: true;
    };
    color: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    compact: {
        type: BooleanConstructor;
        default: boolean;
    };
    rounded: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    running: boolean;
    spinnerColor: string;
}, {
    mountClasses(): string;
}, {
    onClick(): void;
    run(): void;
}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    action?: unknown;
    color?: unknown;
    disabled?: unknown;
    size?: unknown;
    compact?: unknown;
    rounded?: unknown;
} & {
    action: () => Promise<void>;
    color: string;
    disabled: boolean;
    size: string;
    compact: boolean;
    rounded: boolean;
} & {}> & {}, {
    color: string;
    disabled: boolean;
    size: string;
    compact: boolean;
    rounded: boolean;
}>;
export default _default;
