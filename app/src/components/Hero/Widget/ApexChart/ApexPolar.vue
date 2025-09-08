<script>
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			chartOptions: {
				chart: {
					type: 'polarArea',
					toolbar: {
						show: false,
					},
				},
				stroke: {
					width: 0,
				},
				fill: {
					opacity: 1,
				},
				yaxis: {
					show: false,
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
			series: [42, 47, 52, 58, 65],
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<ApexChart :title="$t('chart.polar')">
		<apexchart type="polarArea" :options="chartOptions" :series="series"></apexchart>
	</ApexChart>
</template>
