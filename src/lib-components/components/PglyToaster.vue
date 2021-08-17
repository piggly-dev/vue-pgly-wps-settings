<template>
	<div :class="[
		'pgly-wps--toaster',
		`pgly-wps-in-${position}`
	]">
		<transition-group name="pgly-wps--toast" tag="div">
			<pgly-toast
				v-for="t in toasts"
				:key="t.id"
				:color="t.color"
				:timer="t.timer"
				:light="t.light"
				:close="() => onClose(t.id)">
				{{ t.body }}
			</pgly-toast> 
		</transition-group>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

import PglyToast from '@/lib-components/elements/PglyToast.vue';
import { IToast } from '@/core/interfaces';

export default defineComponent({
	name: 'PglyToaster',

	components: {
		PglyToast
	},

	props: {
		position: {
			type: String,
			validator: (val: string) => {
				return /^(:?n|s|nw|ne|sw|se)$/.test(val);
			},
			default: 'se'
		},

		toasts: {
			type: Array as PropType<Array<IToast>>,
			default: []
		}
	},

	methods: {
		onClose ( id: number ) : void {
			this.$emit('toastClose', id);
		}
	}
});
</script>