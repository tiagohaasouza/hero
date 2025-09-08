<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	components: {},
	props: {
		systemMenu: { type: Boolean, default: false },
		minimizeButton: { type: Boolean, default: false },
		expandButton: { type: Boolean, default: false },
		closeButton: { type: Boolean, default: false },
		draggable: { type: Boolean, default: false },
		resizable: { type: Boolean, default: false },
		fullscreen: { type: Boolean, default: false },
	},
	data() {
		return {};
	},
	methods: {},
	computed: {},
	created() {},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less"></style>

<template>
	<slot />
</template>
