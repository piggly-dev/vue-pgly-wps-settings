<script lang="ts">
import { defineComponent } from 'vue';
import { 
	PglyAsyncButton,
	PglyBadge,
	PglyBadges,
	PglyBasicCheckbox,
	PglyBasicInput,
	PglyBasicSelect,
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

import { IErrorInput, INavigatorItem, INotification, ISelectOption, IToast } from '@/core/interfaces';

export default defineComponent({
	name: 'ServeDev',

	components: {
		PglyAsyncButton,
		PglyBadge,
		PglyBadges,
		PglyBasicCheckbox,
		PglyBasicInput,
		PglyBasicSelect,
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
				enabled: {
					value: false,
					error: { state: false } as IErrorInput
				},
				full_name: {
					value: '',
					error: { state: false } as IErrorInput
				},
				numbers: {
					value: undefined,
					options: [
						{
							label: 'One',
							value: 'one'
						},
						{
							label: 'Two',
							value: 'two'
						},
						{
							label: 'Three',
							value: 'three'
						}
					] as Array<ISelectOption>,
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
			<pgly-basic-checkbox
				id="enabled"
				label="Enable"
				placeholder="Enable this feature"
				:error="fields.enabled.error"
				v-model="fields.enabled.value">
			</pgly-basic-checkbox>
			</pgly-column>
		</pgly-row>

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

		<pgly-row>
			<pgly-column>
			<pgly-basic-select
				id="numbers"
				label="Numbers"
				placeholder="Select one number"
				:error="fields.numbers.error"
				:options="fields.numbers.options"
				v-model="fields.numbers.value">
			</pgly-basic-select>
			</pgly-column>
		</pgly-row>
		
		<pgly-sync-button label="Add Toast" :action="() => { this.addToast({body: 'Toast', color: 'success'}); }"/>
		<pgly-sync-button label="Add Notification" :action="() => { this.addNotification({body: 'Notification', color: 'primary'}); }"/>
	</div>
</template>

<style>
	html { background-color: #ececec; }
	@import './assets/pgly-wps-settings.min.css';
</style>
