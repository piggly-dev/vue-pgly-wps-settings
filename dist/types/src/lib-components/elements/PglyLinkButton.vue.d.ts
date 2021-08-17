declare const _default: import("@vue/runtime-core").DefineComponent<{
    link: {
        type: StringConstructor;
        required: true;
    };
    target: {
        type: StringConstructor;
        default: string;
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
}, unknown, unknown, {
    mountClasses(): string;
}, {}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    link?: unknown;
    target?: unknown;
    color?: unknown;
    disabled?: unknown;
    label?: unknown;
    type?: unknown;
} & {
    link: string;
    target: string;
    color: string;
    disabled: boolean;
    label: string;
    type: string;
} & {}> & {}, {
    target: string;
    color: string;
    disabled: boolean;
    type: string;
}>;
export default _default;
