<script>
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		sizes: {
			type: Array,
			required: true,
		},
	},
	data() {
		return { size: 14 };
	},
	methods: {
		updateFontSize(size) {
			this.size = size;
			this.$emit('change', size);
		},
	},
});
</script>

<template>
	<v-select
		:items="sizes"
		v-model="size"
		@update:modelValue="updateFontSize"
		label="Font Size"
		return-object
	/>
</template>
