<script>
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			chartOptions: {
				chart: {
					type: 'bar',
					toolbar: {
						show: false,
					},
				},
				plotOptions: {
					bar: {
						horizontal: false,
						columnWidth: '55%',
						endingShape: 'rounded',
					},
				},
				dataLabels: {
					enabled: false,
				},
				xaxis: {
					categories: ['January', 'February', 'March', 'April', 'May', 'June'],
				},
				yaxis: {
					title: {
						text: 'Accesses',
					},
				},
				fill: {
					opacity: 1,
				},
				tooltip: {
					y: {
						formatter: function (val) {
							return val + ' accesses';
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
					name: 'Accesses',
					data: [44, 55, 41, 67, 22, 43],
				},
			],
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<ApexChart :title="$t('chart.column')">
		<apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
	</ApexChart>
</template>
