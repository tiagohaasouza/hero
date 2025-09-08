<script>
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			chartOptions: {
				chart: {
					type: 'candlestick',
					toolbar: {
						show: false,
					},
				},
				xaxis: {
					type: 'datetime',
				},
				yaxis: {
					tooltip: {
						enabled: true,
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
					data: [
						{
							x: new Date(1538778600000),
							y: [6629.81, 6650.5, 6623.04, 6633.33],
						},
						{
							x: new Date(1538780400000),
							y: [6632.01, 6643.59, 6620, 6630.11],
						},
						{
							x: new Date(1538782200000),
							y: [6630.71, 6648.95, 6623.34, 6635.65],
						},
						{
							x: new Date(1538784000000),
							y: [6635.65, 6651, 6629.67, 6638.24],
						},
						{
							x: new Date(1538785800000),
							y: [6638.24, 6640, 6620, 6624.47],
						},
					],
				},
			],
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<ApexChart :title="$t('chart.candlestick')">
		<apexchart type="candlestick" :options="chartOptions" :series="series"></apexchart>
	</ApexChart>
</template>
