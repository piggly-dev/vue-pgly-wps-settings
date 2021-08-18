<template>
	<nav 
		:class="[
			'pgly-wps--navigator',
			`pgly-wps-are-${size}`,
		]">
		<a
			v-for="i in items"
			:key="i.key"
			:href="i.link ? i.link : '#'"
			@click="() => { if ( i.link !== undefined ) { return; } onClick(i.key); }"
			:class="[
				'pgly-wps--item',
				{'pgly-wps-is-selected': modelValue === i.key}
			]">
			{{ i.label }}
		</a>
	</nav>
</template>

<script lang="ts">
import { sizes } from "@/core/constants";
import { INavigatorItem } from "@/core/interfaces";
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
	name: 'PglyNavigator',

	emits: [
		'update:modelValue'
	],

	props: {
		modelValue: {
			type: String,
			default: undefined
		},

		items: {
			type: Array as PropType<Array<INavigatorItem>>,
			default: []
		},
		
		size: {
			type: String,
			default: 'normal',
			validator: (value: string) => {
				return sizes.indexOf(value) !== -1;
			}
		},
	},

	methods: {
		onClick ( key: string ) : void {
			this.$emit('update:modelValue', key);
		}
	}
});
</script>