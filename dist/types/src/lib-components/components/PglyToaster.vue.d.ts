import { PropType } from "@vue/runtime-core";
import { IToast } from "../../core/interfaces";
declare const _default: import("@vue/runtime-core").DefineComponent<{
    position: {
        type: StringConstructor;
        validator: (val: string) => boolean;
        default: string;
    };
    toasts: {
        type: PropType<IToast[]>;
        default: never[];
    };
}, unknown, unknown, {}, {
    onClose(id: number): void;
}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    position?: unknown;
    toasts?: unknown;
} & {
    position: string;
    toasts: IToast[];
} & {}> & {}, {
    position: string;
    toasts: IToast[];
}>;
export default _default;
