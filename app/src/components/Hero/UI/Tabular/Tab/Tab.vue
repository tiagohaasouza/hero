<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent, inject } from 'vue';

export default defineComponent({
	props: {
		title: { type: String, required: true },
		icon: { type: String, required: false },
	},
	data() {
		return {
			value: inject('generateTabId')(),
		};
	},
	created() {},
});
</script>

<style scoped lang="less"></style>

<template>
	<v-tab :value="value">
		<v-icon v-if="icon" :icon="icon"></v-icon>
		{{ title }}
	</v-tab>
</template>
