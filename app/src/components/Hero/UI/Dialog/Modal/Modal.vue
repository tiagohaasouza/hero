<script lang="ts">
import { defineComponent } from 'vue';
import {
	VDialog,
	VCard,
	VCardTitle,
	VCardText,
	VCardActions,
	VBtn,
	VIcon,
} from 'vuetify/components';

export default defineComponent({
	components: { VDialog, VCard, VCardTitle, VCardText, VCardActions, VBtn, VIcon },
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
		title: {
			type: String,
			default: '',
		},
		closeIcon: {
			type: String,
			default: 'mdi-close',
		},
		width: {
			type: [String, Number],
			default: 500,
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
	methods: {
		close() {
			this.internalValue = false;
		},
	},
});
</script>

<style scoped lang="less">
.modal-card {
	max-width: 100%;
	width: var(--v-width);
}
.modal-close-btn {
	position: absolute;
	right: 16px;
	top: 16px;
}
</style>

<template>
	<v-dialog v-model="internalValue" :persistent="persistent" :max-width="width">
		<v-card class="modal-card">
			<v-btn icon @click="close" class="modal-close-btn">
				<v-icon>{{ closeIcon }}</v-icon>
			</v-btn>
			<v-card-title v-if="title">{{ title }}</v-card-title>
			<v-card-text>
				<slot />
			</v-card-text>
			<v-card-actions>
				<slot name="actions" />
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
