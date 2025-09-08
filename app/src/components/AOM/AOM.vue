<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';

import Book from '@components/Book/Book.vue';
import DayI from '@components/AOM/Content/DayI/DayI.vue';
import DayII from '@components/AOM/Content/DayII/DayII.vue';
import DayIII from '@components/AOM/Content/DayIII/DayIII.vue';
import DayIV from '@components/AOM/Content/DayIV/DayIV.vue';
import DayV from '@components/AOM/Content/DayV/DayV.vue';
import DayVI from '@components/AOM/Content/DayVI/DayVI.vue';
import DayVII from '@components/AOM/Content/DayVII/DayVII.vue';

import book from '@book';
import '@styles/book/aom/style.less';
//import '@styles/book/aom/theme/medieval.less';
//import '@styles/book/aom/theme/cyberpunk.less';
//import '@styles/book/aom/theme/hightech.less';
//import '@styles/book/aom/theme/scientific.less';
//import '@styles/book/aom/theme/war.less';
//import '@styles/book/aom/theme/revelations.less';
//import '@styles/book/aom/theme/divine.less';

export default defineComponent({
	components: { Book, DayI, DayII, DayIII, DayIV, DayV, DayVI, DayVII },
	props: {
		id: { type: String, default: 'aom' },
		applyContainers: { type: Boolean, default: false },
	},
	data() {
		return {
			pagesHTML: '',
		};
	},
	methods: {
		onBookReady() {
			this.$emit('ready');
		},
	},
	computed: {},
	created() {},
	async mounted() {
		//applyContainers(children: HTMLElement[], pageSize: string, batchSize: number, delay: number, parent: HTMLElement, callback: () => void): void
		/*
		if(this.applyContainers)
		{
			const chaptersChildren = [...document.getElementById(this.id).querySelectorAll('.book-original-content > .book-chapter')].map((chapter) => [...chapter.children]).flat();
			this.pagesHTML = await book.applyContainers(chaptersChildren, 'a4', 500, 100, this.$refs.bookPagesContainer, () => { document.getElementById(this.id).querySelector('.book-original-content').remove(); });
			console.log('CONTAINERS APPLIED');
		}
		*/
		//const chapters = root.map((chapter) => chapter.children);
		//console.log('chapters', chapters.length);
		//console.log(chapters);
	},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less"></style>

<template>
	<Book :id="id" ref="book" name="A Ordem de Melquisedeque">
		<DayI />
		<DayII />
		<DayIII />
		<DayIV />
		<DayV />
		<DayVI />
		<DayVII />
	</Book>
</template>
