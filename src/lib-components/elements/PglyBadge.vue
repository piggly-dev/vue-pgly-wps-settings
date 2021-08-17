<template>
	<div 
		:class="[
			'pgly-wps--badge',
			`pgly-wps-is-${color}`,
			`pgly-wps-is-${size}`,
			{ 'pgly-wps-is-light': light },
			{ 'pgly-wps-is-rounded': rounded }
		]">
		<slot></slot>
		<button 
			v-if="close" 
			class="pgly-wps--delete"
			@click="onClose"></button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

import { colors, sizes } from '@/core/constants';

export default defineComponent({
	name: 'PglyBadge',

	props: {
		color: {
			type: String,
			default: 'regular',
			validator: (value: string) => {
				return colors.indexOf(value) !== -1;
			}
		},

		size: {
			type: String,
			default: 'normal',
			validator: (value: string) => {
				return sizes.indexOf(value) !== -1;
			}
		},

		close: {
			type: Function as PropType<()=>void>,
			default: undefined
		},

		light: {
			type: Boolean,
			default: false
		},

		rounded: {
			type: Boolean,
			default: false
		}
	},

	methods: {
		onClose () : void {
			if ( this.close )
			{ this.close(); return; }
		}
	}
});
</script>