<template>
	<button
		:class="mountClasses"
		:disabled="disabled"
		@click="onClick">
		{{ label }}
		<pgly-spinner
			:color="spinnerColor"
			v-if="running"/>
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

import { PglySpinner } from '@/entry.esm';
import { EButtonTypes } from '@/core/enums';
import { buttonTypes, colors } from '@/core/constants';

export default defineComponent({
	name: 'PglyAsyncButton',

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
				'pgly-async--behaviour',
				`pgly-wps-is-${this.type}`
			];

			if ( this.disabled )
			{ classes.push('pgly-wps-is-disabled'); }
			else 
			{ classes.push(`pgly-wps-is-${this.color}`); }

			if ( this.type === EButtonTypes.COMPACT )
			{ this.spinnerColor = this.color; }

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