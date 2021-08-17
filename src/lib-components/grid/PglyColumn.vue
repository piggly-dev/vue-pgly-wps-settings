<template>
	<div 
		:class="[
			'pgly-wps--column',
			`pgly-wps-col--${size}`
		]">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
	name: 'PglyColumn',

	props: {
		size: {
			type: Number,
			default: 12,
			validator: (value: number) => {
				return value >= 1 && value <= 12;
			}
		}
	}
});
</script>