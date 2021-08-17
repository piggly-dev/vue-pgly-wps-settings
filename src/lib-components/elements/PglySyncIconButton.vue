<template>
	<button
		:class="mountClasses"
		:disabled="disabled"
		@click="onClick">
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

import { colors, sizes } from '@/core/constants';

export default defineComponent({
	name: 'PglySyncIconButton',

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

		size: {
			type: String,
			default: 'regular',
			validator: (value: string) => {
				return sizes.indexOf(value) !== -1;
			}
		},

		compact: {
			type: Boolean,
			default: false
		},

		rounded: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		mountClasses () : string {
			const classes = [
				'pgly-wps--icon-button',
				`pgly-wps-is-${this.size}`
			];

			if ( this.disabled )
			{ classes.push('pgly-wps-is-disabled'); }
			else 
			{ classes.push(`pgly-wps-is-${this.color}`); }

			if ( this.rounded )
			{ classes.push(`pgly-wps-is-rounded`); }

			if ( this.compact )
			{ classes.push(`pgly-wps-is-compact`); }

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