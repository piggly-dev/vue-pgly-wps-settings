declare const _default: import("vue").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    label: {
        type: StringConstructor;
        required: true;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    value: {
        type: StringConstructor;
        required: true;
    };
    tooltip: {
        type: StringConstructor;
        default: undefined;
    };
    compact: {
        type: BooleanConstructor;
        default: boolean;
    };
    light: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    label?: unknown;
    loading?: unknown;
    value?: unknown;
    tooltip?: unknown;
    compact?: unknown;
    light?: unknown;
} & {
    color: string;
    label: string;
    loading: boolean;
    value: string;
    compact: boolean;
    light: boolean;
} & {
    tooltip?: string | undefined;
}> & {}, {
    color: string;
    loading: boolean;
    tooltip: string;
    compact: boolean;
    light: boolean;
}>;
export default _default;
