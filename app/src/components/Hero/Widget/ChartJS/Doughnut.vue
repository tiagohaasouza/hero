<script>
import { defineComponent } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Chart from '@components/Hero/Widget/ChartJS/Chart.vue';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default defineComponent({
	components: { Chart, Doughnut },
	data() {
		return {
			data: {
				labels: ['Red', 'Blue', 'Yellow'],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: ['#f87979', '#a9f879', '#79f8f8'],
						data: [40, 20, 30],
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
			},
		};
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<Chart :title="$t('chart.doughnut')">
		<Doughnut :data="data" :options="options" />
	</Chart>
</template>
