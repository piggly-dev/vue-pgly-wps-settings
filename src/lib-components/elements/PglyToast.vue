<template>
	<div 
		:class="[
			'pgly-wps--toast',
			`pgly-wps-is-${color}`,
			{ 'pgly-wps-is-light': light }
		]">
		<button 
			v-if="close" 
			class="pgly-wps--delete"
			@click="onClose"></button>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

import { colors } from '@/core/constants';

export default defineComponent({
	name: 'PglyToast',

	mounted () {
		if ( this.timer > 0 )
		{
			setTimeout(
				()=>{ this.onClose() },
				this.timer
			);
		}
	},

	props: {
		color: {
			type: String,
			default: 'regular',
			validator: (value: string) => {
				return colors.indexOf(value) !== -1;
			}
		},

		close: {
			type: Function as PropType<()=>void>,
			default: undefined
		},

		timer: {
			type: Number,
			default: 0
		},

		light: {
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