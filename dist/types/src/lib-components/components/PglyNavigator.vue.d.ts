import { INavigatorItem } from "../../core/interfaces";
import { PropType } from "@vue/runtime-core";
declare const _default: import("@vue/runtime-core").DefineComponent<{
    items: {
        type: PropType<INavigatorItem[]>;
        default: never[];
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}, unknown, {
    lastClicked: string;
}, {}, {
    onClick(key: string): void;
}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    items?: unknown;
    size?: unknown;
} & {
    items: INavigatorItem[];
    size: string;
} & {}> & {}, {
    items: INavigatorItem[];
    size: string;
}>;
export default _default;
