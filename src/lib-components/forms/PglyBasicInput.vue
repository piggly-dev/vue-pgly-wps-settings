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
			:class="[
				'pgly-wps--content',
				{'pgly-wps--tagged': tag}
			]">
			<input
				:tabindex="tabindex"
				:id="id"
				:name="id"
				:placeholder="placeholder"
				:required="required"
				:type="type"
				:value="modelValue"
				:disabled="disabled"
				@input="onChanged" />
			<span
				v-if="tag"
				class="pgly-wps--tag">
				{{ tag }}
			</span>
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
import { defineComponent, PropType } from "@vue/runtime-core";

import { HTMLElementEvent } from "@/core/types";
import { IErrorInput } from "@/core/interfaces";

export default defineComponent({
	name: 'PglyBasicInput',

	emits: [
		'update:modelValue',
		'afterChange'
	],

	props: {
		modelValue: {
			type: String,
			default: ''
		},

		tabindex: {
			type: Number,
			default: 0
		},

		id: {
			type: String,
			required: true
		},

		type: {
			type: String,
			default: 'text'
		},

		label: {
			type: String,
			default: undefined
		},

		tag: {
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

		hasDescription () : boolean {
			return !!this.$slots.description;
		}
	},

	methods: {
		onChanged (e: HTMLElementEvent<HTMLInputElement>) : void {
			if ( this.disabled ) return;
			this.$emit('update:modelValue', e.target.value);
			this.$emit('afterChange', e.target.value);
		}
	}
});
</script>