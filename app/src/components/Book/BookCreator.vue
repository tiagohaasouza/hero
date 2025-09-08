<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script lang="ts">
import { defineComponent } from 'vue';

import Tabs from '@components/Hero/UI/Tabular/Tab/Tabs.vue';
import Tab from '@components/Hero/UI/Tabular/Tab/Tab.vue';
import TabWindow from '@components/Hero/UI/Tabular/Tab/TabWindow.vue';
import BookWriter from '@components/Book/BookWriter.vue';
import book from '@book';
import { TIndexMenuChapter } from '@script/Book/type';
import BookIndexMenu from '@components/Book/UI/BookIndexMenu.vue';
import BookBottomNav from '@components/Book/UI/BookBottomNav.vue';

export default defineComponent({
	components: { BookBottomNav, BookIndexMenu, BookWriter, Tabs, Tab, TabWindow },
	props: {
		bookComponent: { required: true },
	},
	data() {
		return {
			indexMenuData: [] as TIndexMenuChapter[],
		};
	},
	methods: {
		onBookReady() {
			this.indexMenuData = book.index.data;
		},
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
	<div class="book-creator">
		<Tabs :stacked="true">
			<template #tabs>
				<Tab :title="$t('common.write', 1)" icon="mdi-typewriter" />
				<Tab :title="$t('preview.label', 1)" icon="mdi-eye-outline" />
				<Tab :title="$t('editor.sourceCode')" icon="mdi-code-block-braces" />
				<Tab :title="$t('editor.compile')" icon="mdi-eye-outline" />
				<Tab :title="$t('generate.pdf')" icon="mdi-file-pdf-box" />
				<Tab :title="$t('command.label', 2)" icon="mdi mdi-console" />
			</template>

			<TabWindow class="a4-margin">
				<BookWriter>
					<template #left>
						<!--
						<BookIndexMenu :menu-data="indexMenuData" />
						-->
					</template>

					<component :is="bookComponent" />
				</BookWriter>
			</TabWindow>

			<TabWindow>
				<BookBuilder> </BookBuilder>
			</TabWindow>

			<TabWindow>
				<Ace />
			</TabWindow>

			<TabWindow>
				<p>Compile</p>
			</TabWindow>

			<TabWindow>
				<p>Generate PDF</p>
			</TabWindow>

			<TabWindow>
				<h2>{{ $t('command.label', 2) }}</h2>
				<CommandExecutor />
			</TabWindow>
		</Tabs>
	</div>
</template>
