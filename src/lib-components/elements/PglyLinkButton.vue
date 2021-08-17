<template>
	<a
		:class="mountClasses"
		:disabled="disabled"
		:href="link"
		:target="target">
		{{ label }}
	</a>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import { buttonTypes, colors } from '@/core/constants';

export default defineComponent({
	name: 'PglyLinkButton',

	props: {
		link: {
			type: String,
			required: true
		},
		
		target: {
			type: String,
			default: '_blank'
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
	}
});
</script>