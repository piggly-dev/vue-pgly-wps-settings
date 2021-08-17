<template>
	<div class="pgly-wps--row">
		<slot></slot>
	</div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
	name: 'PglyRow'
});
</script>