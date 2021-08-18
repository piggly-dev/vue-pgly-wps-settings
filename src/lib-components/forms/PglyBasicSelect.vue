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
			class="pgly-wps--select"
			:id="id"
			:tabindex="tabindex"
			@blur="open = false">
			<div 
				class="selected"
				:class="{open: open}"
				@click="onOpenSelect">
				{{ getLabel }}
				<svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
					<path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/>
					<path d="M0-.75h48v48h-48z" fill="none"/>
				</svg>
			</div>

			<div
				class="items"
				:class="{selectHide: !open}">
				<div
					class="item"
					v-for="option of options"
					:key="option.value"
					:class="{current: option.value === modelValue}"
					@click="onClickItem(option)">
					{{ option.label }}
				</div>
			</div>
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
import { IErrorInput, ISelectOption } from "@/core/interfaces";
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
	name: 'PglyBasicSelect',

	data () {
		return {
			open: false
		}
	},

	emits: [
		'update:modelValue',
		'afterChange'
	],

	props: {
		modelValue: {
			type: String,
			default: undefined
		},

		id: {
			type: String,
			required: true
		},
		
		options: {
			type: Array as PropType<Array<ISelectOption>>,
			default: []
		},

		tabindex: {
			type: Number,
			default: 0
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

		getLabel () : string {
			let found = this.options.find((option: ISelectOption) => {
				return option.value === this.modelValue;
			});

			return found?.label ?? this.placeholder ?? 'Select...';
		},

		hasDescription () : boolean {
			return !!this.$slots.description;
		}
	},

	methods: {
		onOpenSelect () : void {
			if ( this.disabled ) return;
			this.open = !this.open;
		},

		onClickItem (option: ISelectOption) : void {
			if ( this.disabled ) return;

			this.open = false;
			this.$emit('update:modelValue', option.value);
			this.$emit('afterChange', option.value);
		}
	}
});
</script>