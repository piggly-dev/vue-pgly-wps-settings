import { PropType } from "@vue/runtime-core";
import { INotification } from "../../core/interfaces";
declare const _default: import("@vue/runtime-core").DefineComponent<{
    notifications: {
        type: PropType<INotification[]>;
        default: never[];
    };
}, unknown, unknown, {}, {
    onClose(id: number): void;
}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    notifications?: unknown;
} & {
    notifications: INotification[];
} & {}> & {}, {
    notifications: INotification[];
}>;
export default _default;
