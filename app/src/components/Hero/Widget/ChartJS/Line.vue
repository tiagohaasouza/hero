<script>
import { defineComponent } from 'vue';
import { Line } from 'vue-chartjs';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale,
} from 'chart.js';
import Chart from '@components/Hero/Widget/ChartJS/Chart.vue';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

export default defineComponent({
	components: { Chart, Line },
	data() {
		return {
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June'],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: '#f87979',
						data: [40, 39, 10, 40, 39, 80],
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
	<Chart :title="$t('chart.line')">
		<Line :data="data" :options="options" />
	</Chart>
</template>
