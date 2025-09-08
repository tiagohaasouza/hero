<script>
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		label: String,
		value: Boolean,
	},
	methods: {
		emitToggle() {
			this.$emit('toggle', !this.value);
		},
	},
});
</script>

<template>
	<div class="toggle">
		<v-switch v-model="value" :label="label" @click="emitToggle" />
	</div>
</template>
