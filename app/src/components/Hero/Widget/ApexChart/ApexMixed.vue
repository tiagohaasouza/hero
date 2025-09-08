<script>
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			chartOptions: {
				chart: {
					type: 'line',
					toolbar: {
						show: false,
					},
				},
				stroke: {
					curve: 'smooth',
				},
				dataLabels: {
					enabled: false,
				},
				xaxis: {
					categories: ['January', 'February', 'March', 'April', 'May', 'June'],
				},
				yaxis: {
					title: {
						text: 'Usage',
					},
				},
				tooltip: {
					y: {
						formatter: function (val) {
							return val + '%';
						},
					},
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
					name: 'Usage',
					type: 'line',
					data: [30, 40, 35, 50, 49, 60],
				},
				{
					name: 'Revenue',
					type: 'column',
					data: [200, 300, 250, 400, 350, 450],
				},
			],
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<ApexChart :title="$t('chart.mixed')">
		<apexchart type="line" :options="chartOptions" :series="series"></apexchart>
	</ApexChart>
</template>
