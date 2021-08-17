<script lang="ts">
import { defineComponent } from 'vue';
import { 
	PglyAsyncButton,
	PglyBadge,
	PglyExplorer,
	PglyLinkButton,
	PglyNotification,
	PglySpinner, 
	PglySyncButton,
	PglyToaster
} from '@/entry.esm';

import { IToast } from '@/core/interfaces';

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
		PglyToaster
	},

	data () {
		return {
			toasts: [] as Array<IToast>
		}
	},

	methods: {
		clicked () : void {
			console.log('close');
		},

		addToast ( toast: IToast ) : void {
			if ( !toast.id ) toast.id = this.toasts.length+1;

			this.toasts.push(toast);
		},

		onToastClose ( id: number ) : void {
			this.toasts = this.toasts.filter((i: IToast) => {
				return i.id !== id;
			});
		},
	}
});
</script>

<template>
	<div class="pgly-wps--settings">
		<pgly-toaster :toasts="toasts" @toastClose="onToastClose"/>
		<pgly-sync-button label="Add Toast" :action="() => { this.addToast({body: 'Toast', color: 'success'}); }"/>
	</div>
</template>

<style>
	@import './assets/pgly-wps-settings.min.css';
</style>
