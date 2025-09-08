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
import book from '@book';

export default defineComponent({
	components: { Book },
	props: {},
	data() {
		return {
			buildTime: 0,
			buildPercentage: 0,
			totalPages: 0,
			totalChapters: 0,
			totalTexts: 0,
			totalWords: 0,
			elementsAnalysed: 0,
			elementsToAnalyse: 0,
			totalElements: 0,
			totalImages: 0,
			totalLoadedImages: 0,
			totalLoadErrorImages: 0,
			totalNotes: 0,
		};
	},
	methods: {},
	computed: {},
	created() {
		book.observe('buildTime', (buildTime) => (this.buildTime = buildTime));
		book.observe('buildPercentage', (buildPercentage) => (this.buildPercentage = buildPercentage));
		book.observe('totalPages', (totalPages) => (this.totalPages = totalPages));
		book.observe('totalChapters', (totalChapters) => (this.totalChapters = totalChapters));
		book.observe('totalTexts', (totalTexts) => (this.totalTexts = totalTexts));
		book.observe('totalWords', (totalWords) => (this.totalWords = totalWords));
		book.observe(
			'elementsAnalysed',
			(elementsAnalysed) => (this.elementsAnalysed = elementsAnalysed),
		);
		book.observe(
			'elementsToAnalyse',
			(elementsToAnalyse) => (this.elementsToAnalyse = elementsToAnalyse),
		);
		book.observe('totalElements', (totalElements) => (this.totalElements = totalElements));
		book.observe('totalImages', (totalImages) => (this.totalImages = totalImages));
		book.observe(
			'totalLoadedImages',
			(totalLoadedImages) => (this.totalLoadedImages = totalLoadedImages),
		);
		book.observe(
			'totalLoadErrorImages',
			(totalLoadErrorImages) => (this.totalLoadErrorImages = totalLoadErrorImages),
		);
		book.observe(
			'totalNotes',
			(totalLoadErrorImages) => (this.totalLoadErrorImages = totalLoadErrorImages),
		);
	},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less">
.book-builder {
	//border: 2px dashed #000;
}

.navigation-drawer,
.layout {
	height: 100vh;
}

td:first-child {
	text-align: left;
}

td:last-child {
	text-align: center;
}
</style>

<template>
	<div class="book-builder">
		<v-row>
			<v-col>
				<v-layout class="layout">
					<v-navigation-drawer
						class="navigation-drawer navigation-drawer-full-width"
						theme="dark"
						permanent
					>
						<v-list color="transparent">
							<v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
							<v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
							<v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
						</v-list>

						<template v-slot:append> </template>
					</v-navigation-drawer>
					<v-main style="height: 400px"></v-main>
				</v-layout>
			</v-col>

			<v-col>
				<slot />
			</v-col>

			<v-col>
				<v-layout class="layout">
					<v-navigation-drawer
						class="navigation-drawer navigation-drawer-full-width"
						location="right"
						permanent
					>
						<template v-slot:prepend>
							<v-list-item prepend-icon="$info"
								><h4>{{ $t('book.info.label') }}</h4></v-list-item
							>
						</template>

						<v-divider></v-divider>

						<v-table>
							<tbody>
								<tr>
									<td>{{ $t('build.time') }}</td>
									<td>{{ buildTime }}</td>
								</tr>

								<tr>
									<td>{{ $t('build.percentage') }}</td>
									<td>{{ buildPercentage }}</td>
								</tr>

								<tr>
									<td>{{ $t('total.pages') }}</td>
									<td>{{ totalPages }}</td>
								</tr>

								<tr>
									<td>{{ $t('total.chapters') }}</td>
									<td>{{ totalChapters }}</td>
								</tr>

								<tr>
									<td>{{ $t('total.texts') }}</td>
									<td>{{ totalTexts }}</td>
								</tr>

								<tr>
									<td>{{ $t('total.words') }}</td>
									<td>{{ totalWords }}</td>
								</tr>

								<tr>
									<td>{{ $t('analysis.elementsToAnalyse') }}</td>
									<td>{{ elementsToAnalyse }}</td>
								</tr>

								<tr>
									<td>{{ $t('analysis.elements') }}</td>
									<td>{{ elementsAnalysed }}</td>
								</tr>

								<tr>
									<td>{{ $t('total.elements') }}</td>
									<td>{{ totalElements }}</td>
								</tr>

								<tr>
									<td>{{ $t('total.images') }}</td>
									<td>{{ totalImages }}</td>
								</tr>

								<tr>
									<td>{{ $t('total.loadedImages') }}</td>
									<td>{{ totalLoadedImages }}</td>
								</tr>

								<tr>
									<td>{{ $t('total.loadErrorImages') }}</td>
									<td>{{ totalLoadErrorImages }}</td>
								</tr>

								<tr>
									<td>{{ $t('total.notes') }}</td>
									<td>{{ totalNotes }}</td>
								</tr>
							</tbody>
						</v-table>
					</v-navigation-drawer>
				</v-layout>
			</v-col>
		</v-row>
	</div>
</template>
