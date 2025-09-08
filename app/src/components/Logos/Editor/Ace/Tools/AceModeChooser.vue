<script>
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		modes: {
			type: Array,
			required: true,
		},
	},
	data() {
		return { mode: 'javascript' };
	},
	methods: {
		updateMode(mode) {
			this.mode = mode;
			this.$emit('change', mode);
		},
	},
});
</script>

<template>
	<v-select
		:items="modes"
		v-model="mode"
		label="Mode"
		@update:modelValue="updateMode"
		return-object
	/>
</template>
