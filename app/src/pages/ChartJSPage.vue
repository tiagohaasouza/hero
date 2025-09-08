<script>
import { defineComponent } from 'vue';
import DashboardSummaryCard from '@components/Hero/HTML/Card/Dashboard/DashboardSummaryCard.vue';
import PageHeader from '@components/Hero/App/Layout/Page/PageHeader.vue';

import Bar from '@components/Hero/Widget/ChartJS/Bar.vue';
import Bubble from '@components/Hero/Widget/ChartJS/Bubble.vue';
import Doughnut from '@components/Hero/Widget/ChartJS/Doughnut.vue';
import Line from '@components/Hero/Widget/ChartJS/Line.vue';
import Pie from '@components/Hero/Widget/ChartJS/Pie.vue';
import Polar from '@components/Hero/Widget/ChartJS/Polar.vue';
import Radar from '@components/Hero/Widget/ChartJS/Radar.vue';
import Scatter from '@components/Hero/Widget/ChartJS/Scatter.vue';

import { useUserStore } from '@stores/user';

export default defineComponent({
	components: { DashboardSummaryCard, Bar, Bubble, Doughnut, Line, Pie, Polar, Radar, Scatter },
	props: {
		sizes: { type: Array, default: () => [12, 6, 6, 3, 3] },
	},
	data() {
		return {
			userStore: useUserStore(),
			lastAccess: new Date('2023-07-03T14:48:00'),
		};
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
}
</style>

<template>
	<Page name="Charts JS" full>
		<PageHeader title="Charts JS" />

		<PageBody>
			<v-container>
				<section>
					<v-col cols="12">
						<h2>{{ $t('commerce.label', 1) }}</h2>
						<v-divider />
					</v-col>

					<v-row>
						<Col :sizes><Bar /></Col>
						<Col :sizes><Bubble /></Col>
						<Col :sizes><Scatter /></Col>
						<Col :sizes><Line /></Col>
					</v-row>

					<v-row>
						<Col :sizes><Doughnut /></Col>
						<Col :sizes><Pie /></Col>
						<Col :sizes><Polar /></Col>
						<Col :sizes><Radar /></Col>
					</v-row>
				</section>
			</v-container>
			<!--
			<v-container fluid>

				<LoremIpsum min="10" max="20" type="paragraphs" />

			</v-container>
			-->
		</PageBody>

		<PageFooter />
	</Page>
</template>
