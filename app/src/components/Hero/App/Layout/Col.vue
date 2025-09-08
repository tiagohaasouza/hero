<script>
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		sizes: { type: Array, default: () => [] },
		defaultSizes: { type: Array, default: () => [12, 6, 3, 3, 3] },
		sizeKeys: { type: Array, default: () => ['sm', 'md', 'lg', 'xl', 'xxl'] },
	},
	computed: {
		colSizes() {
			const colSizes = {};

			this.sizeKeys.forEach(
				(size, index) => (colSizes[size] = this.sizes[index] || this.defaultSizes[index]),
			);

			return colSizes;
		},
		combinedAttrs() {
			return { ...this.$attrs, ...this.colSizes };
		},
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<v-col cols="12" v-bind="combinedAttrs">
		<slot />
	</v-col>
</template>
