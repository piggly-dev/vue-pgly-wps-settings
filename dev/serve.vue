<script lang="ts">
import { defineComponent } from 'vue';
import { 
	PglyAsyncButton,
	PglyLinkButton,
	PglySpinner, 
	PglySyncButton 
} from '@/entry.esm';

export default defineComponent({
	name: 'ServeDev',

	components: {
		PglyAsyncButton,
		PglyLinkButton,
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
		<pgly-link-button
			label="Go to new page"
			color="primary"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			color="info"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			color="success"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			color="accent"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			color="warning"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			color="danger"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			color="primary"
			:disabled="true"
			link="https://google.com"/>
		<div></div>
		<pgly-link-button
			label="Go to new page"
			type="compact"
			color="primary"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			type="compact"
			color="info"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			type="compact"
			color="success"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			type="compact"
			color="accent"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			type="compact"
			color="warning"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			type="compact"
			color="danger"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			type="compact"
			color="primary"
			:disabled="true"
			link="https://google.com"/>
		<div></div>
		<pgly-link-button
			label="Go to new page"
			type="expanded"
			color="primary"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			type="expanded"
			color="info"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			type="expanded"
			color="success"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			type="expanded"
			color="accent"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			type="expanded"
			color="warning"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			type="expanded"
			color="danger"
			link="https://google.com"/>
		<pgly-link-button
			label="Go to new page"
			type="expanded"
			color="primary"
			:disabled="true"
			link="https://google.com"/>
	</div>
</template>

<style>
	@import './assets/pgly-wps-settings.min.css';
</style>
