<script lang="ts">
import { defineComponent } from 'vue';
import { 
	PglyAsyncButton,
	PglyBadge,
	PglyBadges,
	PglyBasicInput,
	PglyColumn,
	PglyExplorer,
	PglyLinkButton,
	PglyNavigator,
	PglyNotification,
	PglyNotifications,
	PglyRow,
	PglySpinner, 
	PglySyncButton,
	PglyToaster
} from '@/entry.esm';

import { IErrorInput, INavigatorItem, INotification, IToast } from '@/core/interfaces';

export default defineComponent({
	name: 'ServeDev',

	components: {
		PglyAsyncButton,
		PglyBadge,
		PglyBadges,
		PglyBasicInput,
		PglyColumn,
		PglyExplorer,
		PglyLinkButton,
		PglyNavigator,
		PglyNotification,
		PglyNotifications,
		PglyRow,
		PglySpinner,
		PglySyncButton,
		PglyToaster
	},

	data () {
		return {
			fields: {
				full_name: {
					value: '',
					error: { state: false } as IErrorInput
				}
			},
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

		<pgly-row>
			<pgly-column>
				<pgly-basic-input
					id="full-name"
					label="Full name"
					placeholder="Fill with your full name..."
					tag="Example"
					:required="true"
					:error="fields.full_name.error"
					v-model="fields.full_name.value">
					<template v-slot:description>
						It's must be your full name.
					</template>
				</pgly-basic-input>
			</pgly-column>
		</pgly-row>
		
		<pgly-sync-button label="Add Toast" :action="() => { this.addToast({body: 'Toast', color: 'success'}); }"/>
		<pgly-sync-button label="Add Notification" :action="() => { this.addNotification({body: 'Notification', color: 'primary'}); }"/>
	</div>
</template>

<style>
	@import './assets/pgly-wps-settings.min.css';
</style>
