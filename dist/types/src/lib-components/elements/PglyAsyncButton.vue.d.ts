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
    label: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
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
    label?: unknown;
    type?: unknown;
} & {
    action: () => Promise<void>;
    color: string;
    disabled: boolean;
    label: string;
    type: string;
} & {}> & {}, {
    color: string;
    disabled: boolean;
    type: string;
}>;
export default _default;
