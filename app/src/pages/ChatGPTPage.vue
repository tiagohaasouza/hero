<script>
import { defineComponent } from 'vue';
import PageHeader from '@components/Hero/App/Layout/Page/PageHeader.vue';
import PageBody from '@components/Hero/App/Layout/Page/PageBody.vue';
import PageFooter from '@components/Hero/App/Layout/Page/PageFooter.vue';
import ChatGPT from '@components/Logos/AI/ChatGPT/ChatGPT.vue';

export default defineComponent({
	components: { PageHeader, PageBody, PageFooter, ChatGPT },
	props: {},
	data() {
		return {};
	},
	methods: {},
	mounted() {},
});
</script>

<style scoped lang="less">
.text {
}

.login-info {
}

section {
	margin-top: 30px;

	h2 {
		font-size: 2rem;
	}
}
</style>

<template>
	<Page name="Home">
		<PageHeader :title="'ChatGPT'" />

		<PageBody>
			<v-container>
				<section>
					<h2>ChatGPT</h2>

					<ChatGPT />
				</section>
			</v-container>
		</PageBody>

		<PageFooter />
	</Page>
</template>
