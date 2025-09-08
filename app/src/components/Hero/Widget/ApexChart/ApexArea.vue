<script>
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			chartOptions: {
				chart: {
					type: 'area',
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
						text: 'Traffic',
					},
				},
				tooltip: {
					y: {
						formatter: function (val) {
							return val + ' visits';
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
					name: 'Traffic',
					data: [31, 40, 28, 51, 42, 109, 100],
				},
			],
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<ApexChart :title="$t('chart.area')">
		<apexchart type="area" :options="chartOptions" :series="series"></apexchart>
	</ApexChart>
</template>
