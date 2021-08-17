<script lang="ts">
import { defineComponent } from 'vue';
import { 
	PglyAsyncButton,
	PglyLinkButton,
	PglyNotification,
	PglySpinner, 
	PglySyncButton 
} from '@/entry.esm';

export default defineComponent({
	name: 'ServeDev',

	components: {
		PglyAsyncButton,
		PglyLinkButton,
		PglyNotification,
		PglySpinner,
		PglySyncButton,
	},

	methods: {
		clicked () : Promise<void> {
			return new Promise((res) => {
				setTimeout(()=>res(), 3000);
			});
		}
	}
});
</script>

<template>
	<div class="pgly-wps--settings">
	</div>
</template>

<style>
	@import './assets/pgly-wps-settings.min.css';
</style>
