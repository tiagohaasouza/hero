<script>
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			chartOptions: {
				chart: {
					type: 'donut',
					toolbar: {
						show: false,
					},
				},
				labels: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Opera'],
				responsive: [
					{
						breakpoint: undefined,
						options: {
							responsive: true,
							legend: {
								position: 'bottom',
							},
						},
					},
				],
			},
			series: [44, 55, 13, 43, 22],
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<ApexChart :title="$t('chart.donut')">
		<apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
	</ApexChart>
</template>
