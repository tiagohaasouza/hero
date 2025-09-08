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
	data() {
		return {
			value: inject('generateTabWindowId')(),
		};
	},
	created() {},
});
</script>

<template>
	<v-tabs-window-item :value="value">
		<slot />
	</v-tabs-window-item>
</template>

<style scoped lang="less"></style>
