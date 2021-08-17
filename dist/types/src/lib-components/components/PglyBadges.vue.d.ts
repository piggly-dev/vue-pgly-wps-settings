import { PropType } from "@vue/runtime-core";
import { IBadge } from "../../core/interfaces";
declare const _default: import("@vue/runtime-core").DefineComponent<{
    addons: {
        type: BooleanConstructor;
        default: boolean;
    };
    badges: {
        type: PropType<IBadge[]>;
        default: never[];
    };
    position: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}, unknown, unknown, {}, {
    onClose(id: number): void;
}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    addons?: unknown;
    badges?: unknown;
    position?: unknown;
    size?: unknown;
} & {
    addons: boolean;
    badges: IBadge[];
    position: string;
    size: string;
} & {}> & {}, {
    addons: boolean;
    badges: IBadge[];
    position: string;
    size: string;
}>;
export default _default;
