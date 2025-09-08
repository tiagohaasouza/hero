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
					width: [2, 2],
					curve: 'smooth',
				},
				dataLabels: {
					enabled: false,
				},
				xaxis: {
					categories: ['Q1', 'Q2', 'Q3', 'Q4'],
				},
				yaxis: {
					title: {
						text: 'Value',
					},
				},
				tooltip: {
					y: {
						formatter: function (val) {
							return val;
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
					name: 'Product 1',
					data: [10, 40, 30, 50],
				},
				{
					name: 'Product 2',
					data: [20, 30, 40, 60],
				},
			],
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<ApexChart :title="$t('chart.slope')">
		<apexchart type="line" :options="chartOptions" :series="series"></apexchart>
	</ApexChart>
</template>
