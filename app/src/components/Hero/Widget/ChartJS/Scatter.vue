<script>
import { defineComponent } from 'vue';
import { Scatter } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';
import Chart from '@components/Hero/Widget/ChartJS/Chart.vue';

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

export default defineComponent({
	components: { Chart, Scatter },
	data() {
		return {
			data: {
				datasets: [
					{
						label: 'Scatter Dataset',
						backgroundColor: '#f87979',
						data: [
							{ x: -10, y: 0 },
							{ x: 0, y: 10 },
							{ x: 10, y: 5 },
							{ x: 0.5, y: 5.5 },
						],
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false, // Allow the chart to take full container width
				scales: {
					x: {
						beginAtZero: true,
					},
					y: {
						beginAtZero: true,
					},
				},
			},
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<Chart :title="$t('chart.scatter')">
		<Scatter :data="data" :options="options" />
	</Chart>
</template>
