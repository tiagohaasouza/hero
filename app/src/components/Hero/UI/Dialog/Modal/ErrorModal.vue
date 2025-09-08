<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';

export default defineComponent({
	components: {},
	props: {
		visible: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			error: null,
			fatal: false,
			title: '',
			message: '',
		};
	},
	methods: {
		closeModal() {
			this.$emit('update:visible', false);
		},
		getTitleColor() {
			return this.fatal ? '#f44336' : '#ff9800';
		},
	},
	computed: {},
	created() {
		this.fatal = this.error?.fatal || false;
		this.message = this.error?.message || '';

		console.log('ERROR:', this.error);
		console.log('MESSAGE:', this.message);
		console.log('FATAL:', this.fatal);
	},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less">
.error-modal {
	width: 400px;
}
.error-modal__title {
	color: white;
	padding: 16px;
}
.error-modal__text {
	padding: 16px;
}
.error-modal__actions {
	display: flex;
	justify-content: center;
	padding: 8px;
}
</style>

<template>
	<v-dialog v-model="visible" :persistent="fatal" max-width="400">
		<v-card class="error-modal">
			<v-card-title class="error-modal__title" :style="{ backgroundColor: getTitleColor() }">
				{{ fatal ? 'fatal error' : 'Error' }}{{ title ? `: ${title}` : '' }}
			</v-card-title>

			<v-card-text class="error-modal__text">{{ message }}</v-card-text>

			<div class="error-modal__actions" v-if="!fatal">
				<v-btn color="primary" @click="closeModal">{{ $t('close') }}</v-btn>
			</div>
		</v-card>
	</v-dialog>
</template>
