<script lang="ts">
import { defineComponent } from 'vue';
import { VDialog, VCard, VCardActions, VSpacer, VKbd } from 'vuetify/components';

export default defineComponent({
	components: {
		VDialog,
		VCard,
		VCardActions,
		VSpacer,
		VKbd,
	},
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
		width: {
			type: [String, Number],
			default: 600,
		},
		persistent: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			internalValue: this.modelValue,
		};
	},
	watch: {
		modelValue(newValue) {
			this.internalValue = newValue;
		},
		internalValue(newValue) {
			this.$emit('update:modelValue', newValue);
		},
	},
});
</script>

<style scoped lang="less">
.transparent-card {
	background-color: rgba(0, 0, 0, 0.5);
	border: none;
	box-shadow: none;
}
.transparent-actions {
	background-color: transparent !important;
}
</style>

<template>
	<v-dialog v-model="internalValue" :persistent="persistent" :max-width="width">
		<v-card class="transparent-card">
			<v-card-text>
				<slot />
			</v-card-text>
			<v-card-actions class="transparent-actions">
				<div class="ps-4 text-caption"><v-kbd>Enter</v-kbd> to select</div>
				<v-spacer></v-spacer>
				<div class="pe-4 text-caption"><v-kbd>Esc</v-kbd> to close</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
