import { INavigatorItem } from "../../core/interfaces";
import { PropType } from "@vue/runtime-core";
declare const _default: import("@vue/runtime-core").DefineComponent<{
    modelValue: {
        type: StringConstructor;
        default: undefined;
    };
    items: {
        type: PropType<INavigatorItem[]>;
        default: never[];
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}, unknown, unknown, {}, {
    onClick(key: string): void;
}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    items?: unknown;
    size?: unknown;
} & {
    items: INavigatorItem[];
    size: string;
} & {
    modelValue?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string;
    items: INavigatorItem[];
    size: string;
}>;
export default _default;
