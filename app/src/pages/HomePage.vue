<script>
import { defineComponent } from 'vue';
import DashboardSummaryCard from '@components/Hero/HTML/Card/Dashboard/DashboardSummaryCard.vue';

import Bar from '@components/Hero/Widget/ChartJS/Bar.vue';
import Bubble from '@components/Hero/Widget/ChartJS/Bubble.vue';
import Doughnut from '@components/Hero/Widget/ChartJS/Doughnut.vue';
import Line from '@components/Hero/Widget/ChartJS/Line.vue';
import Pie from '@components/Hero/Widget/ChartJS/Pie.vue';
import Polar from '@components/Hero/Widget/ChartJS/Polar.vue';
import Radar from '@components/Hero/Widget/ChartJS/Radar.vue';
import Scatter from '@components/Hero/Widget/ChartJS/Scatter.vue';

import { useUserStore } from '@stores/user';
import DashboardSparkLineCard from '@components/Hero/HTML/Card/Dashboard/DashboardSparkLineCard.vue';
import DashboardSparkLineCard2 from '@components/Hero/HTML/Card/Dashboard/DashboardSparkLineCard2.vue';
import LogoText from '@components/Hero/App/Layout/LogoText.vue';

import PageHeader from '@components/Hero/App/Layout/Page/PageHeader.vue';
import PageBody from '@components/Hero/App/Layout/Page/PageBody.vue';
import PageFooter from '@components/Hero/App/Layout/Page/PageFooter.vue';
import Page from '@components/Hero/App/Layout/Page/Page.vue';

export default defineComponent({
	components: {
		Page,
		PageHeader,
		PageBody,
		PageFooter,
		LogoText,
		DashboardSparkLineCard,
		DashboardSparkLineCard2,
		DashboardSummaryCard,
		Bar,
		Bubble,
		Doughnut,
		Line,
		Pie,
		Polar,
		Radar,
		Scatter,
	},
	props: {},
	data() {
		return {
			userStore: useUserStore(),
			lastAccess: new Date('2024-07-13 14:30:45'),
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

	h2 {
		font-size: 2rem;
	}
}
</style>

<template>
	<Page name="Home">
		<PageHeader :title="$t('user.dashboard')" />

		<PageBody>
			<v-container>
				<v-alert type="info" elevation="2" variant="tonal" class="login-info">
					<span
						>{{ $t('greeting.hello') }}, {{ userStore.getFullName }}, {{ $t('user.lastAccessIn') }}:
						{{ $d(new Date('2024-07-13 14:30:45'), 'long') }}.</span
					>
				</v-alert>

				<section>
					<v-col cols="12">
						<h2 class="text">{{ $t('summary') }}</h2>
						<v-divider />
					</v-col>

					<v-row>
						<Col>
							<DashboardSummaryCard
								icon="mdi-cart"
								:title="$t('commerce.order.label', 2)"
								:sub-title="'690 ' + $t('new.label', 10)"
								text="6,00,00"
								color="blue"
							/>
						</Col>

						<Col>
							<DashboardSummaryCard
								icon="mdi-account"
								:title="$t('commerce.customer.label', 2)"
								:sub-title="'1885 ' + $t('new.label', 10)"
								text="1,12,900"
								color="pink"
							/>
						</Col>

						<Col>
							<DashboardSummaryCard
								icon="mdi-chart-line"
								:title="$t('commerce.sales.label', 2)"
								:sub-title="'80% ' + $t('commerce.growth')"
								text="3,42,230"
								color="orange"
							/>
						</Col>

						<Col>
							<DashboardSummaryCard
								icon="mdi-currency-usd"
								:title="$t('dashboard.profit')"
								:sub-title="'$890 ' + $t('localization.today')"
								text="$25,000"
								color="green"
							/>
						</Col>
					</v-row>
				</section>

				<section>
					<v-col cols="12">
						<h2>{{ $t('commerce.label', 1) }}</h2>
						<v-divider />
					</v-col>

					<v-row>
						<Col :sizes="[12, 4, 4, 4, 4]">
							<DashboardSparkLineCard />
						</Col>

						<Col :sizes="[12, 4, 4, 4, 4]">
							<DashboardSparkLineCard />
						</Col>

						<Col :sizes="[12, 4, 4, 4, 4]">
							<DashboardSparkLineCard />
						</Col>
					</v-row>
				</section>

				<section>
					<v-col cols="12">
						<h2>{{ $t('blog.label', 1) }}</h2>
						<v-divider />
					</v-col>

					<v-row>
						<Col :sizes="[12, 4, 4, 4, 4]">
							<DashboardSparkLineCard2 />
						</Col>

						<Col :sizes="[12, 4, 4, 4, 4]">
							<DashboardSparkLineCard2 />
						</Col>

						<Col :sizes="[12, 4, 4, 4, 4]">
							<DashboardSparkLineCard2 />
						</Col>
					</v-row>

					<v-row>
						<Col :sizes="[12, 6, 6, 3, 3]"><Bar /></Col>
						<Col :sizes="[12, 6, 6, 3, 3]"><Bubble /></Col>
						<Col :sizes="[12, 6, 6, 3, 3]"><Scatter /></Col>
						<Col :sizes="[12, 6, 6, 3, 3]"><Line /></Col>
					</v-row>

					<v-row>
						<Col><Doughnut /></Col>
						<Col><Pie /></Col>
						<Col><Polar /></Col>
						<Col><Radar /></Col>
					</v-row>
				</section>
			</v-container>
		</PageBody>

		<PageFooter />
	</Page>
</template>
