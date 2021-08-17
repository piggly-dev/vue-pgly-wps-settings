<script lang="ts">
import { defineComponent } from 'vue';
import { PglySpinner } from '@/entry.esm';

export default defineComponent({
	name: 'ServeDev',

	components: {
		PglySpinner,
	}
});
</script>

<template>
	<div class="pgly-wps--settings">
		<pgly-spinner color="primary" />
	</div>
</template>

<style>
	@import './assets/pgly-wps-settings.min.css';
</style>
