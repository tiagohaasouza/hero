<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';
import BookPage from '@components/Book/Page/BookPage.vue';

export default defineComponent({
	components: {},
	props: {
		pageComponent: { type: Object, default: BookPage },
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

<style scoped lang="less">
@cornerSize: 2.5cm;
@A4Width: 21cm;
@A4Height: 29.7cm;

.book-pages {
	width: @A4Width;
	margin: auto;
	padding: 0;
}
</style>

<template>
	<!--
	<component ref="currentPage" :is="pageComponent" />
	-->

	<div ref="bookPages" class="book-pages">
		<slot />
	</div>
</template>
