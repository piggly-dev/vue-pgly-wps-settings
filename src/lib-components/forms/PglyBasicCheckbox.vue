<template>
	<div 
		:class="mountClasses">
		<label
			:class="[
				'pgly-wps--label',
				{hidden: !label}
			]"
			:for="id">
			{{ label }}
		</label>
		<div 
			:class="mountCheckboxClasses"
			@click="e => (onChanged(!modelValue))">
			<div class="pgly-wps--icon"></div>
			<div class="pgly-wps--placeholder">{{ placeholder }}</div>
		</div>
		<span
			v-if="error.message"
			class="pgly-wps--message">
			{{ error.message }}
		</span>
		<p
			v-if="hasDescription"
			class="pgly-wps--description">
			<slot name="description"></slot>
		</p>
	</div>
</template>

<script lang="ts">
import { IErrorInput } from "@/core/interfaces";
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
	name: 'PglyBasicCheckbox',

	emits: [
		'update:modelValue'
	],
	
	props: {
		modelValue: {
			type: Boolean,
			default: false
		},

		id: {
			type: String,
			required: true
		},

		label: {
			type: String,
			default: undefined
		},

		placeholder: {
			type: String,
			default: undefined
		},

		required: {
			type: Boolean,
			default: false
		},

		disabled: {
			type: Boolean,
			default: false
		},

		error: {
			type: Object as PropType<IErrorInput>,
			default: { state: false }
		}
	},

	computed: {
		mountClasses () : string {
			const classes = ['pgly-wps--field'];

			if ( this.error.state )
			{ classes.push('pgly-wps--error'); }

			return classes.join(' ');
		},
		
		mountCheckboxClasses () : string {
			const classes = ['pgly-wps--checkbox'];

			if ( this.disabled )
			{ classes.push('pgly-disabled--state'); }

			if ( this.modelValue )
			{ classes.push('pgly-checked--state'); }

			return classes.join(' ');
		},

		hasDescription () : boolean {
			return !!this.$slots.description;
		}
	},

	methods: {
		onChanged (checked: boolean) : void {
			if ( this.disabled ) return;
			this.$emit('update:modelValue', checked);
		}
	}
});
</script>