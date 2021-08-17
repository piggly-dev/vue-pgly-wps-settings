<script lang="ts">
import { defineComponent } from 'vue';
import { 
	PglyAsyncButton,
	PglyBadge,
	PglyBadges,
	PglyExplorer,
	PglyLinkButton,
	PglyNavigator,
	PglyNotification,
	PglyNotifications,
	PglySpinner, 
	PglySyncButton,
	PglyToaster
} from '@/entry.esm';

import { INavigatorItem, INotification, IToast } from '@/core/interfaces';

export default defineComponent({
	name: 'ServeDev',

	components: {
		PglyAsyncButton,
		PglyBadge,
		PglyBadges,
		PglyExplorer,
		PglyLinkButton,
		PglyNavigator,
		PglyNotification,
		PglyNotifications,
		PglySpinner,
		PglySyncButton,
		PglyToaster
	},

	data () {
		return {
			toasts: [] as Array<IToast>,
			notifications: [] as Array<INotification>,
			items: [
				{
					key: 'one',
					label: 'One',
				},
				{
					key: 'two',
					label: 'Two',
				},
				{
					key: 'three',
					label: 'Three',
				},
				{
					key: 'four',
					label: 'Four',
				},
				{
					key: 'five',
					label: 'Five',
				}
			] as Array<INavigatorItem>
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

		addNotification ( notification: INotification ) : void {
			if ( !notification.id ) notification.id = this.notifications.length+1;

			this.notifications.push(notification);
		},

		onNofiticationClose ( id: number ) : void {
			this.notifications = this.notifications.filter((i: INotification) => {
				return i.id !== id;
			});
		},
	}
});
</script>

<template>
	<div class="pgly-wps--settings">
		<pgly-notifications :notifications="notifications" @notificationClose="onNofiticationClose"/>
		<pgly-toaster :toasts="toasts" @toastClose="onToastClose"/>
		<pgly-navigator :items="items"/>
		<pgly-sync-button label="Add Toast" :action="() => { this.addToast({body: 'Toast', color: 'success'}); }"/>
		<pgly-sync-button label="Add Notification" :action="() => { this.addNotification({body: 'Notification', color: 'primary'}); }"/>
	</div>
</template>

<style>
	@import './assets/pgly-wps-settings.min.css';
</style>
