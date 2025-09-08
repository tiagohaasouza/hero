<script>
import { defineComponent } from 'vue';
import { Bubble } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';
import Chart from '@components/Hero/Widget/ChartJS/Chart.vue';

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

export default defineComponent({
	components: { Chart, Bubble },
	data() {
		return {
			data: {
				datasets: [
					{
						label: 'Data One',
						backgroundColor: '#f87979',
						data: [
							{ x: 20, y: 30, r: 15 },
							{ x: 40, y: 10, r: 10 },
							{ x: 25, y: 50, r: 25 },
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
	<Chart :title="$t('chart.bubble')">
		<Bubble :data="data" :options="options" />
	</Chart>
</template>
