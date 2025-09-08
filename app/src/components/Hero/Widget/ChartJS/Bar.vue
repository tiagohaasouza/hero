<script>
import { defineComponent } from 'vue';
import { Bar } from 'vue-chartjs';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
} from 'chart.js';
import Chart from '@components/Hero/Widget/ChartJS/Chart.vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
	components: { Chart, Bar },
	props: {},
	data() {
		return {
			data: {
				responsive: true,
				labels: ['January', 'February', 'March', 'April', 'May', 'June'],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: '#f87979',
						data: [40, 20, 12, 39, 10, 40],
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
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
	methods: {},
	computed: {},
	created() {},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less"></style>

<template>
	<Chart :title="$t('chart.bar')">
		<Bar :data="data" v-bind="$attrs" :options="options" />
	</Chart>
</template>
