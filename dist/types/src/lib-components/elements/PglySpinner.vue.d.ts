declare const _default: import("vue").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    centered: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    centered?: unknown;
} & {
    color: string;
    centered: boolean;
} & {}> & {}, {
    color: string;
    centered: boolean;
}>;
export default _default;
