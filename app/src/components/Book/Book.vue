<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import BookNotes from '@components/Book/Text/BookNotes.vue';
import book from '@book';
import Toast from '@script/Logos/Dialog/Toast';
import Timer from '@script/Logos/Timer/Timer';
import app from '@app';

export default defineComponent({
	components: { BookNotes },
	props: {
		name: { type: String, required: true },
		id: { type: String, default: 'aom' },
		applyContainers: { type: Boolean, default: false },
		debug: { type: Boolean, default: true },
	},
	data() {
		return {
			toastInfo: markRaw(new Toast()),
			timer: markRaw(new Timer()),
		};
	},
	methods: {
		build(): void {
			book.addEventListener('build:complete', this.onBuildComplete.bind(this));
			book.setDefaults(this.$refs.book as HTMLElement);
			setTimeout(async () => await book.wrapContent(), 2000);
			this.timer.addEventListener('tick', this.onTimerTick.bind(this));
			this.timer.start();
		},
		onBuildComplete(_: Event): void {
			book.removeEventListener('build:complete', this.onBuildComplete.bind(this));
		},
		onTimerTick(e: Event): void {
			const detail = (e as CustomEvent<{ formatedTime: string }>).detail;
			book.meta.buildTime = detail.formatedTime;
		},
	},
	computed: {},
	created() {},
	mounted() {
		setTimeout(() => this.build(), 1000);
	},
	beforeUnmount() {
		book.removeEventListener('build:complete', this.onBuildComplete.bind(this));
		this.timer.removeEventListener('tick', this.onTimerTick.bind(this));
		this.timer.stop();
	},
	unmounted() {},
});
</script>

<style scoped lang="less">
.book,
.book-pages,
.book-original-content {
	position: relative;
	display: table;
	height: auto;
	width: 100%;
}

.book-pages {
	margin-bottom: 50px;
	//margin: 50px auto;
	//border: 2px solid black;
}
</style>

<template>
	<div :id="id" ref="book" class="book" :class="id">
		<div class="book-pages-container">
			<h1>Book Pages</h1>

			<div ref="bookPages" class="book-pages"></div>
		</div>

		<div ref="bookNotes" class="book-notes">
			<slot name="notes" />
		</div>

		<div class="book-original-content-container">
			<h1>Book Original Content</h1>

			<div ref="originalContent" class="book-original-content book-content a4-width elevation-2">
				<slot />
			</div>
		</div>
	</div>
</template>
