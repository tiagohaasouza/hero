<script>
import { defineComponent } from 'vue';
import { PolarArea } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';
import Chart from '@components/Hero/Widget/ChartJS/Chart.vue';

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale);

export default defineComponent({
	components: { Chart, PolarArea },
	data() {
		return {
			data: {
				labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: ['#f87979', '#a9f879', '#f8e879', '#a8a8a8', '#79f8f8'],
						data: [11, 16, 7, 3, 14],
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false, // Allow the chart to take full container width
			},
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<Chart :title="$t('chart.polar')">
		<PolarArea :data="data" :options="options" />
	</Chart>
</template>
