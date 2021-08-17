<template>
	<div 
		class="pgly-wps--notifications">
		<transition-group name="pgly-wps--notification" tag="div">
			<pgly-notification
				v-for="n in notifications"
				:key="n.id"
				:color="n.color"
				:timer="n.timer"
				:light="n.light"
				:close="() => onClose(n.id)">
				{{ n.body }}
			</pgly-notification> 
		</transition-group>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

import PglyNotification from '@/lib-components/elements/PglyNotification.vue';
import { IToast } from '@/core/interfaces';

export default defineComponent({
	name: 'PglyNotifications',

	components: {
		PglyNotification
	},

	props: {
		notifications: {
			type: Array as PropType<Array<IToast>>,
			default: []
		}
	},

	methods: {
		onClose ( id: number ) : void {
			this.$emit('notificationClose', id);
		}
	}
});
</script>