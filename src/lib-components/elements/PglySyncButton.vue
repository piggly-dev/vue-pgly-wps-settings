<template>
	<button
		:class="mountClasses"
		:disabled="disabled"
		@click="onClick">
		{{ label }}
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

import { buttonTypes, colors } from '@/core/constants';

export default defineComponent({
	name: 'PglySyncButton',

	data () {
		return {
			running: false
		};
	},

	props: {
		action: {
			type: Function as PropType<()=>void>,
			required: true
		},

		color: {
			type: String,
			default: 'primary',
			validator: (value: string) => {
				return colors.indexOf(value) !== -1;
			}
		},

		disabled: {
			type: Boolean,
			default: false
		},

		label: {
			type: String,
			required: true
		},

		type: {
			type: String,
			default: 'regular',
			validator: (value: string) => {
				return buttonTypes.indexOf(value) !== -1;
			}
		},
	},

	computed: {
		mountClasses () : string {
			const classes = [
				'pgly-wps--button',
				`pgly-wps-is-${this.type}`
			];

			if ( this.disabled )
			{ classes.push('pgly-wps-is-disabled'); }
			else 
			{ classes.push(`pgly-wps-is-${this.color}`); }

			return classes.join(' ');
		}
	},

	methods: {
		onClick () : void {
			if ( this.disabled || this.running ) return;
			this.run();
		},

		run () : void {
			this.running = true;

			try
			{ this.action(); }
			catch ( err: any )
			{ this.$emit('buttonError', err); }

			this.running = false;
		}
	}
});
</script>