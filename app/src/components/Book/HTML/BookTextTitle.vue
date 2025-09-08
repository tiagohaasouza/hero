<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script lang="ts">
import { defineComponent, inject } from 'vue';
import book from '@book';

export default defineComponent({
	components: {},
	props: {
		title: { type: String, default: '' },
	},
	data() {
		return {
			chapterId: undefined as string | undefined,
			id: undefined as string | undefined,
			slotContent: undefined as string | undefined,
		};
	},
	methods: {},
	computed: {},
	created() {
		const getChapterId = inject<() => string>('getChapterId');
		this.chapterId = getChapterId ? getChapterId() : undefined;
		++book.meta.totalTexts;
	},
	mounted() {
		if (!this.title && this.$slots.default) {
			const slotNodes = this.$slots.default();
			if (slotNodes.length > 0 && typeof slotNodes[0].children === 'string') {
				this.slotContent = slotNodes[0].children;
			}
		}

		const finalTitle = this.title || this.slotContent || '';
		this.id = book.index.addText(this.chapterId ?? '', finalTitle)?.slug;
	},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less"></style>

<template>
	<h2 :id="id" class="book-section-title">
		<slot>{{ title }}</slot>
	</h2>
</template>
