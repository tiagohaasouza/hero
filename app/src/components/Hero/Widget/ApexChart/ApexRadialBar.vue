<script>
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			chartOptions: {
				chart: {
					type: 'radialBar',
					toolbar: {
						show: false,
					},
				},
				plotOptions: {
					radialBar: {
						dataLabels: {
							name: {
								fontSize: '22px',
							},
							value: {
								fontSize: '16px',
							},
							total: {
								show: true,
								label: 'Total',
								formatter: function (w) {
									return 249;
								},
							},
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
			series: [67, 84, 97, 61],
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<ApexChart :title="$t('chart.radialbar')">
		<apexchart type="radialBar" :options="chartOptions" :series="series"></apexchart>
	</ApexChart>
</template>
