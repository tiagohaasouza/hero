<script>
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			chartOptions: {
				chart: {
					type: 'treemap',
					toolbar: {
						show: false,
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
						{ x: 'Category A', y: 10 },
						{ x: 'Category B', y: 20 },
						{ x: 'Category C', y: 30 },
						{ x: 'Category D', y: 40 },
						{ x: 'Category E', y: 50 },
					],
				},
			],
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<ApexChart :title="$t('chart.treemap')">
		<apexchart type="treemap" :options="chartOptions" :series="series"></apexchart>
	</ApexChart>
</template>
