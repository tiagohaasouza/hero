<script>
import { defineComponent, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default defineComponent({
	components: {
		apexchart: VueApexCharts,
	},
	props: {
		type: {
			type: Number,
			required: true,
		},
	},
	setup(props) {
		const sparklineOptions = computed(() => {
			switch (props.type) {
				case 1:
					return {
						chartOptions: {
							chart: {
								type: 'area',
								height: 160,
								sparkline: {
									enabled: true,
								},
							},
							stroke: {
								curve: 'straight',
							},
							fill: {
								opacity: 0.3,
							},
							yaxis: {
								min: 0,
							},
							colors: ['#DCE6EC'],
							title: {
								text: '$424,652',
								offsetX: 0,
								style: {
									fontSize: '24px',
								},
							},
							subtitle: {
								text: 'Sales',
								offsetX: 0,
								style: {
									fontSize: '14px',
								},
							},
						},
						series: [
							{
								data: [45, 52, 38, 45, 19, 23, 2, 45, 5, 32, 65, 43],
							},
						],
					};
				case 2:
					return {
						chartOptions: {
							chart: {
								type: 'area',
								height: 160,
								sparkline: {
									enabled: true,
								},
							},
							stroke: {
								curve: 'straight',
							},
							fill: {
								opacity: 0.3,
							},
							yaxis: {
								min: 0,
							},
							colors: ['#DCE6EC'],
							title: {
								text: '$235,312',
								offsetX: 0,
								style: {
									fontSize: '24px',
								},
							},
							subtitle: {
								text: 'Expenses',
								offsetX: 0,
								style: {
									fontSize: '14px',
								},
							},
						},
						series: [
							{
								data: [45, 52, 38, 45, 19, 23, 2, 45, 5, 32, 65, 43],
							},
						],
					};
				case 3:
					return {
						chartOptions: {
							chart: {
								type: 'area',
								height: 160,
								sparkline: {
									enabled: true,
								},
							},
							stroke: {
								curve: 'straight',
							},
							fill: {
								opacity: 0.3,
							},
							yaxis: {
								min: 0,
							},
							colors: ['#DCE6EC'],
							title: {
								text: '$135,965',
								offsetX: 0,
								style: {
									fontSize: '24px',
								},
							},
							subtitle: {
								text: 'Profits',
								offsetX: 0,
								style: {
									fontSize: '14px',
								},
							},
						},
						series: [
							{
								data: [45, 52, 38, 45, 19, 23, 2, 45, 5, 32, 65, 43],
							},
						],
					};
				case 4:
					return {
						chartOptions: {
							chart: {
								type: 'line',
								width: 100,
								height: 35,
								sparkline: {
									enabled: true,
								},
							},
							tooltip: {
								fixed: {
									enabled: false,
								},
								x: {
									show: false,
								},
								y: {
									title: {
										formatter: function () {
											return '';
										},
									},
								},
								marker: {
									show: false,
								},
							},
						},
						series: [
							{
								data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
							},
						],
					};
				case 5:
					return {
						chartOptions: {
							chart: {
								type: 'line',
								width: 100,
								height: 35,
								sparkline: {
									enabled: true,
								},
							},
							tooltip: {
								fixed: {
									enabled: false,
								},
								x: {
									show: false,
								},
								y: {
									title: {
										formatter: function () {
											return '';
										},
									},
								},
								marker: {
									show: false,
								},
							},
						},
						series: [
							{
								data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
							},
						],
					};
				case 6:
					return {
						chartOptions: {
							chart: {
								type: 'pie',
								width: 40,
								height: 40,
								sparkline: {
									enabled: true,
								},
							},
							stroke: {
								width: 1,
							},
							tooltip: {
								fixed: {
									enabled: false,
								},
							},
						},
						series: [43, 32, 12, 9],
					};
				case 7:
					return {
						chartOptions: {
							chart: {
								type: 'donut',
								width: 40,
								height: 40,
								sparkline: {
									enabled: true,
								},
							},
							stroke: {
								width: 1,
							},
							tooltip: {
								fixed: {
									enabled: false,
								},
							},
						},
						series: [43, 32, 12, 9],
					};
				case 8:
					return {
						chartOptions: {
							chart: {
								type: 'bar',
								width: 100,
								height: 35,
								sparkline: {
									enabled: true,
								},
							},
							plotOptions: {
								bar: {
									columnWidth: '80%',
								},
							},
							labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
							xaxis: {
								crosshairs: {
									width: 1,
								},
							},
							tooltip: {
								fixed: {
									enabled: false,
								},
								x: {
									show: false,
								},
								y: {
									title: {
										formatter: function () {
											return '';
										},
									},
								},
								marker: {
									show: false,
								},
							},
						},
						series: [
							{
								data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
							},
						],
					};
				case 9:
					return {
						chartOptions: {
							chart: {
								type: 'bar',
								width: 100,
								height: 35,
								sparkline: {
									enabled: true,
								},
							},
							plotOptions: {
								bar: {
									columnWidth: '80%',
								},
							},
							labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
							xaxis: {
								crosshairs: {
									width: 1,
								},
							},
							tooltip: {
								fixed: {
									enabled: false,
								},
								x: {
									show: false,
								},
								y: {
									title: {
										formatter: function () {
											return '';
										},
									},
								},
								marker: {
									show: false,
								},
							},
						},
						series: [
							{
								data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
							},
						],
					};
				case 10:
					return {
						chartOptions: {
							chart: {
								type: 'radialBar',
								width: 50,
								height: 50,
								sparkline: {
									enabled: true,
								},
							},
							dataLabels: {
								enabled: false,
							},
							plotOptions: {
								radialBar: {
									hollow: {
										margin: 0,
										size: '50%',
									},
									track: {
										margin: 0,
									},
									dataLabels: {
										show: false,
									},
								},
							},
						},
						series: [45],
					};
				case 11:
					return {
						chartOptions: {
							chart: {
								type: 'radialBar',
								width: 40,
								height: 40,
								sparkline: {
									enabled: true,
								},
							},
							dataLabels: {
								enabled: false,
							},
							plotOptions: {
								radialBar: {
									hollow: {
										margin: 0,
										size: '50%',
									},
									track: {
										margin: 1,
									},
									dataLabels: {
										show: false,
									},
								},
							},
						},
						series: [53, 67],
					};
				default:
					return {
						chartOptions: {},
						series: [],
					};
			}
		});

		return {
			sparklineOptions,
		};
	},
});
</script>

<style scoped lang="less">
.chart-container {
	position: relative;
}
</style>

<template>
	<v-card>
		<v-card-text>
			<div class="chart-container">
				<apexchart
					:type="sparklineOptions.chartOptions.chart.type"
					:options="sparklineOptions.chartOptions"
					:series="sparklineOptions.series"
				></apexchart>
			</div>
		</v-card-text>
	</v-card>
</template>
