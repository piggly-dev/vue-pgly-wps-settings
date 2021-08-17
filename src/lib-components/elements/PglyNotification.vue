<template>
	<div 
		v-if="showing"
		:class="[
			'pgly-wps--notification',
			`pgly-wps-is-${color}`,
			{ 'pgly-wps-is-light': light }
		]">
		<button 
			v-if="canClose" 
			class="pgly-wps--delete"
			@click="close"></button>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import { colors } from '@/core/constants';

export default defineComponent({
	name: 'PglyNotification',

	data () {
		return {
			showing: true
		};
	},

	mounted () {
		if ( this.timer > 0 )
		{
			setTimeout(
				()=>{ this.showing = false },
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

		canClose: {
			type: Boolean,
			default: true
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
		close () : void {
			this.showing = false;
		}
	}
});
</script>