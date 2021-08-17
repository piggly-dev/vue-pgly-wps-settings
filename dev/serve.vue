<script lang="ts">
import { defineComponent } from 'vue';
import { 
	PglyAsyncButton,
	PglyBadge,
	PglyExplorer,
	PglyLinkButton,
	PglyNotification,
	PglySpinner, 
	PglySyncButton 
} from '@/entry.esm';

export default defineComponent({
	name: 'ServeDev',

	components: {
		PglyAsyncButton,
		PglyBadge,
		PglyExplorer,
		PglyLinkButton,
		PglyNotification,
		PglySpinner,
		PglySyncButton,
	},

	methods: {
		clicked () : void {
			console.log('close');
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
