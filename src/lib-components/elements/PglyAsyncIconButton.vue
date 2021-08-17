<template>
	<button
		:class="mountClasses"
		:disabled="disabled"
		@click="onClick">
		<slot></slot>
		<pgly-spinner
			:color="spinnerColor"
			v-if="running"/>
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

import PglySpinner from '@/lib-components/elements/PglySpinner.vue';
import { colors, sizes } from '@/core/constants';

export default defineComponent({
	name: 'PglyAsyncIconButton',

	components: {
		PglySpinner
	},

	data () {
		return {
			running: false,
			spinnerColor: 'white'
		};
	},

	props: {
		action: {
			type: Function as PropType<()=>Promise<void>>,
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
				'pgly-wps--button',
				'pgly-async--behaviour',
				`pgly-wps-is-${this.size}`
			];

			if ( this.disabled )
			{ classes.push('pgly-wps-is-disabled'); }
			else 
			{ classes.push(`pgly-wps-is-${this.color}`); }

			if ( this.compact )
			{ 
				this.spinnerColor = this.color; 
				classes.push(`pgly-wps-is-compact`);
			}

			if ( this.rounded )
			{ classes.push(`pgly-wps-is-rounded`); }

			if ( this.running )
			{ classes.push('pgly-loading--state'); }

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

			this
				.action()
				.then(res => {
					this.$emit('buttonLoaded', res);
				})
				.catch((err: Error) => {
					this.$emit('buttonError', err);
				})
				.finally(() => {
					this.running = false;
				})
		}
	}
});
</script>