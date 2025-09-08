<script>
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			chartOptions: {
				chart: {
					type: 'bubble',
					toolbar: {
						show: false,
					},
				},
				dataLabels: {
					enabled: false,
				},
				xaxis: {
					tickAmount: 12,
					type: 'category',
				},
				yaxis: {
					max: 70,
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
					name: 'Bubble1',
					data: generateData(20, { min: 10, max: 60 }),
				},
				{
					name: 'Bubble2',
					data: generateData(20, { min: 10, max: 60 }),
				},
				{
					name: 'Bubble3',
					data: generateData(20, { min: 10, max: 60 }),
				},
			],
		};
	},
});

function generateData(count, yrange) {
	var i = 0;
	var series = [];
	while (i < count) {
		var x = i + 1;
		var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
		var z = Math.floor(Math.random() * 60) + 15;

		series.push([x, y, z]);
		i++;
	}
	return series;
}
</script>

<style scoped lang="less"></style>

<template>
	<ApexChart :title="$t('chart.bubble')">
		<apexchart type="bubble" :options="chartOptions" :series="series"></apexchart>
	</ApexChart>
</template>
