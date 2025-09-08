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
import ApexDonut from '@components/Hero/Widget/ApexChart/ApexDonut.vue';
import ApexScatter from '@components/Hero/Widget/ApexChart/ApexScatter.vue';
import ApexHeatMap from '@components/Hero/Widget/ApexChart/ApexHeatMap.vue';
import ApexRange from '@components/Hero/Widget/ApexChart/ApexRange.vue';
import ApexSlope from '@components/Hero/Widget/ApexChart/ApexSlope.vue';

export default defineComponent({
	components: {
		ApexSlope,
		ApexRange,
		ApexHeatMap,
		ApexScatter,
		ApexDonut,
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
	props: {
		sizes: { type: Array, default: () => [12, 6, 6, 3, 3] },
		sparkLinesSizes: { type: Array, default: () => [12, 3, 3, 3, 3] },
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
	<Page name="Apex Charts">
		<PageHeader title="Apex Charts" />

		<PageBody>
			<v-container>
				<section>
					<v-row>
						<Col :sizes><ApexBar /></Col>
						<Col :sizes><ApexLine /></Col>
						<Col :sizes><ApexArea /></Col>
						<Col :sizes><ApexPie /></Col>
						<Col :sizes><ApexDonut /></Col>
						<Col :sizes><ApexScatter /></Col>
						<Col :sizes><ApexHeatMap /></Col>
						<Col :sizes><ApexRadialBar /></Col>
						<Col :sizes><ApexBubble /></Col>
						<Col :sizes><ApexCandleStick /></Col>
						<Col :sizes><ApexColumns /></Col>
						<Col :sizes><ApexMixed /></Col>
						<Col :sizes><ApexFunnel /></Col>
						<Col :sizes><ApexBoxPlot /></Col>
						<Col :sizes><ApexTreeMap /></Col>
						<Col :sizes><ApexSlope /></Col>
						<Col :sizes><ApexPolar /></Col>
						<!--
						<Col :sizes><ApexRange /></Col>
						<Col :sizes="[12, 12, 12, 12, 12]"><ApexTimeline /></Col>
						-->
					</v-row>

					<v-row>
						<Col :sizes="sparkLinesSizes"><ApexSparkLine :type="1" /></Col>
						<Col :sizes="sparkLinesSizes"><ApexSparkLine :type="2" /></Col>
						<Col :sizes="sparkLinesSizes"><ApexSparkLine :type="3" /></Col>
						<Col :sizes="sparkLinesSizes"><ApexSparkLine :type="4" /></Col>
						<Col :sizes="sparkLinesSizes"><ApexSparkLine :type="5" /></Col>
						<Col :sizes="sparkLinesSizes"><ApexSparkLine :type="6" /></Col>
						<Col :sizes="sparkLinesSizes"><ApexSparkLine :type="7" /></Col>
						<Col :sizes="sparkLinesSizes"><ApexSparkLine :type="8" /></Col>
						<Col :sizes="sparkLinesSizes"><ApexSparkLine :type="9" /></Col>
						<Col :sizes="sparkLinesSizes"><ApexSparkLine :type="10" /></Col>
						<Col :sizes="sparkLinesSizes"><ApexSparkLine :type="11" /></Col>
					</v-row>
				</section>
			</v-container>
		</PageBody>

		<PageFooter />
	</Page>
</template>
