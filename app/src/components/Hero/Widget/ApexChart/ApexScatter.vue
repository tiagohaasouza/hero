<script>
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			chartOptions: {
				chart: {
					type: 'scatter',
					toolbar: {
						show: false,
					},
					zoom: {
						enabled: true,
						type: 'xy',
					},
				},
				xaxis: {
					type: 'datetime',
				},
				yaxis: {
					max: 70,
				},
				tooltip: {
					y: {
						formatter: function (val) {
							return val + ' users';
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
					name: 'Users',
					data: [
						{ x: new Date('2023-01-01').getTime(), y: 30 },
						{ x: new Date('2023-02-01').getTime(), y: 40 },
						{ x: new Date('2023-03-01').getTime(), y: 35 },
						{ x: new Date('2023-04-01').getTime(), y: 50 },
						{ x: new Date('2023-05-01').getTime(), y: 49 },
						{ x: new Date('2023-06-01').getTime(), y: 60 },
					],
				},
			],
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<ApexChart :title="$t('chart.scatter')">
		<apexchart type="scatter" :options="chartOptions" :series="series"></apexchart>
	</ApexChart>
</template>
