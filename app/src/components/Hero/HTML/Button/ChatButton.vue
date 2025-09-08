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
	props: {},
	data() {
		return {};
	},
	methods: {
		onClick(e) {},
	},
	computed: {},
	created() {},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less"></style>

<template>
	<Button icon @click="onClick" v-bind="$attrs">
		<v-badge :content="5" color="error">
			<v-icon>mdi-chat-outline</v-icon>
		</v-badge>
		<v-tooltip activator="parent" location="bottom">{{ $t('chat.show') }}</v-tooltip>
	</Button>
</template>
