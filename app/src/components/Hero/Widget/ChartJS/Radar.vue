<script>
import { defineComponent } from 'vue';
import { Radar } from 'vue-chartjs';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	LineElement,
	PointElement,
	RadialLinearScale,
} from 'chart.js';
import Chart from '@components/Hero/Widget/ChartJS/Chart.vue';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, RadialLinearScale);

export default defineComponent({
	components: { Chart, Radar },
	data() {
		return {
			data: {
				labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
				datasets: [
					{
						label: 'My First dataset',
						backgroundColor: 'rgba(179,181,198,0.2)',
						borderColor: 'rgba(179,181,198,1)',
						pointBackgroundColor: 'rgba(179,181,198,1)',
						pointBorderColor: '#fff',
						data: [65, 59, 90, 81, 56, 55, 40],
					},
					{
						label: 'My Second dataset',
						backgroundColor: 'rgba(255,99,132,0.2)',
						borderColor: 'rgba(255,99,132,1)',
						pointBackgroundColor: 'rgba(255,99,132,1)',
						pointBorderColor: '#fff',
						data: [28, 48, 40, 19, 96, 27, 100],
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false, // Allow the chart to take full container width
				scales: {
					r: {
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
	<Chart :title="$t('chart.radar')">
		<Radar :data="data" :options="options" />
	</Chart>
</template>
