<script lang="ts">
import { defineComponent } from 'vue';
import { PglySpinner, PglySyncButton } from '@/entry.esm';

export default defineComponent({
	name: 'ServeDev',

	components: {
		PglySpinner,
		PglySyncButton,
	},

	methods: {
		clicked () : void {
			console.log('clicked to it');
		}
	}
});
</script>

<template>
	<div class="pgly-wps--settings">
		<pgly-sync-button
			label="Click me"
			color="primary"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			color="info"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			color="success"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			color="accent"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			color="warning"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			color="danger"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			color="primary"
			:disabled="true"
			:action="clicked"/>
		<div></div>
		<pgly-sync-button
			label="Click me"
			type="compact"
			color="primary"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			type="compact"
			color="info"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			type="compact"
			color="success"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			type="compact"
			color="accent"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			type="compact"
			color="warning"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			type="compact"
			color="danger"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			type="compact"
			color="primary"
			:disabled="true"
			:action="clicked"/>
		<div></div>
		<pgly-sync-button
			label="Click me"
			type="expanded"
			color="primary"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			type="expanded"
			color="info"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			type="expanded"
			color="success"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			type="expanded"
			color="accent"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			type="expanded"
			color="warning"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			type="expanded"
			color="danger"
			:action="clicked"/>
		<pgly-sync-button
			label="Click me"
			type="expanded"
			color="primary"
			:disabled="true"
			:action="clicked"/>
	</div>
</template>

<style>
	@import './assets/pgly-wps-settings.min.css';
</style>
