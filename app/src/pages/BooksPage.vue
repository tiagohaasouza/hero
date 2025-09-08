<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import Page from '@components/Hero/App/Layout/Page/Page.vue';
import PageHeader from '@components/Hero/App/Layout/Page/PageHeader.vue';
import PageBody from '@components/Hero/App/Layout/Page/PageBody.vue';
import PageFooter from '@components/Hero/App/Layout/Page/PageFooter.vue';

import app from '@app';
import BookCard from '@components/Book/Element/Card/BookCard.vue';
import Ace from '@components/Logos/Editor/Ace/Ace.vue';
import Tabs from '@components/Hero/UI/Tabular/Tab/Tabs.vue';
import Tab from '@components/Hero/UI/Tabular/Tab/Tab.vue';
import TabWindow from '@components/Hero/UI/Tabular/Tab/TabWindow.vue';

import BookBuilder from '@components/Book/BookBuilder.vue';
import CommandExecutor from '@components/Logos/CMD/CommandExecutor.vue';
import IndexedDBImages from '@script/Logos/DataBase/IndexedDBImages';
import BookCreator from '@components/Book/BookCreator.vue';
import AOM from '@components/AOM/AOM.vue';

export default defineComponent({
	components: {
		AOM,
		BookCreator,
		BookBuilder,
		Tabs,
		Tab,
		TabWindow,
		Ace,
		BookCard,
		Page,
		PageHeader,
		PageBody,
		PageFooter,
		CommandExecutor,
	},
	props: {},
	data() {
		return {
			code: 'function(){}',
			bookId: null as string | null,
			bookComponent: markRaw(AOM),
		};
	},
	methods: {
		checkClearCache() {
			const urlParams = new URLSearchParams(window.location.search);

			if (urlParams.has('clear-cache-book-images')) {
				IndexedDBImages.deleteDatabase('bookImagesDB')
					.then(() => {
						console.log('Banco de dados de imagens deletado com sucesso.');

						urlParams.delete('clear-cache-book-images');
						const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
						window.location.replace(newUrl);
					})
					.catch((err) => {
						console.error('Erro ao deletar banco de dados:', err);
					});
			}
		},
	},
	created() {
		this.bookId = app.router.urlParam('id');
		this.checkClearCache();
		//console.log('book id:', this.bookId);
	},
	mounted() {},
});
</script>

<style scoped lang="less">
section {
	margin-top: 30px;

	h2 {
		font-size: 2rem;
	}
}
</style>

<template>
	<Page name="Books">
		<PageHeader :title="$t('book.label', 2)" />

		<PageBody>
			<v-container>
				<section v-if="!bookId">
					<v-row>
						<Col>
							<BookCard />
						</Col>

						<Col>
							<BookCard />
						</Col>

						<Col>
							<BookCard />
						</Col>

						<Col>
							<BookCard />
						</Col>
					</v-row>
				</section>

				<section v-else>
					<BookCreator :bookComponent="bookComponent" />
				</section>
			</v-container>
		</PageBody>

		<PageFooter />
	</Page>
</template>
