<template>
	<svg 
		:class="[
			'pgly-wps--spinner', 
			`pgly-wps-is-${color}`, 
			{'pgly-wps-is-absolute': centered}
		]"
		viewBox="0 0 50 50">
		<circle 
			class="path" 
			cx="25" 
			cy="25" 
			r="20" 
			fill="none" 
			stroke-width="5">
		</circle>
	</svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { colors } from '@/core/constants';

export default defineComponent({
	name: 'PglySpinner',

	props: {
		color: {
			type: String,
			default: 'white',
			validator: (value: string) => {
				return colors.indexOf(value) !== -1;
			}
		},

		centered: {
			type: Boolean,
			default: false
		}
	}
});
</script>