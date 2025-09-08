<script>
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			chartOptions: {
				chart: {
					type: 'radar',
					toolbar: {
						show: false,
					},
				},
				stroke: {
					width: 2,
				},
				fill: {
					opacity: 0.2,
				},
				markers: {
					size: 0,
				},
				xaxis: {
					categories: ['Speed', 'Reliability', 'Security', 'Performance', 'Accessibility'],
				},
				responsive: [
					{
						breakpoint: undefined,
						options: {
							responsive: true,
						},
					},
				],
			},
			series: [
				{
					name: 'Server Metrics',
					data: [80, 90, 70, 85, 60],
				},
			],
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<ApexChart :title="$t('chart.radar')">
		<apexchart type="radar" :options="chartOptions" :series="series"></apexchart>
	</ApexChart>
</template>
