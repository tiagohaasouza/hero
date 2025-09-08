<script>
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			chartOptions: {
				chart: {
					type: 'heatmap',
					toolbar: {
						show: false,
					},
				},
				plotOptions: {
					heatmap: {
						shadeIntensity: 0.5,
						radius: 0,
						useFillColorAsStroke: true,
						colorScale: {
							ranges: [
								{ from: 0, to: 20, color: '#00A100' },
								{ from: 21, to: 40, color: '#128FD9' },
								{ from: 41, to: 60, color: '#FFB200' },
								{ from: 61, to: 80, color: '#FF0000' },
							],
						},
					},
				},
				dataLabels: {
					enabled: false,
				},
				xaxis: {
					type: 'category',
				},
				title: {
					text: 'Heatmap with Multiple Series',
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
			series: generateHeatmapData(6, 10),
		};
	},
});

function generateHeatmapData(count, count2) {
	var series = [];
	for (var i = 0; i < count; i++) {
		var data = [];
		for (var j = 0; j < count2; j++) {
			data.push({
				x: 'W' + (j + 1).toString(),
				y: Math.floor(Math.random() * 90) + 10,
			});
		}
		series.push({
			name: 'Metric' + (i + 1).toString(),
			data: data,
		});
	}
	return series;
}
</script>

<style scoped lang="less">
.chart-container {
	width: 100%;
	height: 100%;
}
</style>

<template>
	<div class="chart-container">
		<ApexChart :title="$t('chart.heatmap')">
			<apexchart type="heatmap" :options="chartOptions" :series="series"></apexchart>
		</ApexChart>
	</div>
</template>
