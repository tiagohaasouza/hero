<script>
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			chartOptions: {
				chart: {
					type: 'boxPlot',
					toolbar: {
						show: false,
					},
				},
				plotOptions: {
					boxPlot: {
						colors: {
							upper: '#5C4742',
							lower: '#A5978B',
						},
					},
				},
				xaxis: {
					type: 'category',
					categories: ['Category 1', 'Category 2', 'Category 3'],
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
					type: 'boxPlot',
					data: [
						{
							x: 'Category 1',
							y: [54, 66, 69, 75, 88],
						},
						{
							x: 'Category 2',
							y: [43, 65, 69, 76, 81],
						},
						{
							x: 'Category 3',
							y: [31, 39, 45, 51, 59],
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
	<ApexChart :title="$t('chart.boxplot')">
		<apexchart type="boxPlot" :options="chartOptions" :series="series"></apexchart>
	</ApexChart>
</template>
