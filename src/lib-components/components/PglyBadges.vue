<template>
	<div 
		:class="[
			'pgly-wps--badges',
			`pgly-wps-are-${size}`,
			`pgly-wps-is-${position}`,
			{'pgly-wps-has-addons': addons}
		]">
		<transition-group name="pgly-wps--badge" tag="div">
			<pgly-badge
				v-for="b in badges"
				:key="b.id"
				:color="b.color"
				:size="b.size"
				:light="b.light"
				:rounded="b.rounded"
				:close="b.id !== undefined ? () => onClose(b.id) : undefined">
				{{ b.body }}
			</pgly-badge> 
		</transition-group>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

import PglyBadge from '@/lib-components/elements/PglyBadge.vue';
import { IBadge } from '@/core/interfaces';
import { sizes } from "@/core/constants";

export default defineComponent({
	name: 'PglyBadges',

	components: {
		PglyBadge
	},

	props: {
		addons: {
			type: Boolean,
			default: false
		},

		badges: {
			type: Array as PropType<Array<IBadge>>,
			default: []
		},
		
		position: {
			type: String,
			default: 'left',
			validator: (value: string) => {
				return ['left','centered','right'].indexOf(value) !== -1;
			}
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
		onClose ( id: number ) : void {
			this.$emit('badgeClose', id);
		}
	}
});
</script>