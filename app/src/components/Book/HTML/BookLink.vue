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
	props: {
		class: {
			type: String,
			default: '',
		},
		style: {
			type: Object,
			default: null,
		},
		href: {
			type: String,
			default: '#',
		},
	},
	data() {
		return {
			classes: '',
		};
	},
	computed: {
		computedClasses() {
			return `${this.class} book-link`;
		},
	},
	created() {},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less"></style>

<template>
	<a :href="href" :class="computedClasses" :style="style">
		<slot />
	</a>
</template>
