<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	components: {},
	props: {},
	data() {
		return {};
	},
	methods: {},
	computed: {},
	created() {},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less">
.card {
	padding: 16px;
}
.card-title {
	font-size: 1.25rem;
	font-weight: 500;
}
.card-subtitle {
	font-size: 1rem;
	color: gray;
}
.card-text {
	font-size: 2rem;
	font-weight: bold;
}
.v-img {
	margin-top: 16px;
}
</style>

<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<h2>Status statistics</h2>
			</v-col>
			<v-col cols="12" md="6" lg="3">
				<v-card>
					<v-card-title>Transactions</v-card-title>
					<v-card-subtitle>+1.37%</v-card-subtitle>
					<v-card-text class="text-h3">1352</v-card-text>
					<!-- Placeholder for chart -->
					<v-img src="https://via.placeholder.com/150x75.png?text=Chart" />
				</v-card>
			</v-col>

			<v-col cols="12" md="6" lg="3">
				<v-card>
					<v-card-title>Sales Orders Revenue</v-card-title>
					<v-card-text>
						<div>Sales: 563</div>
						<div>Orders: 720</div>
						<div>Revenue: 5900</div>
					</v-card-text>
					<!-- Placeholder for chart -->
					<v-img src="https://via.placeholder.com/150x75.png?text=Chart" />
				</v-card>
			</v-col>

			<v-col cols="12" md="6" lg="3">
				<v-card>
					<v-card-title>Sales Analytics</v-card-title>
					<v-card-subtitle>78%</v-card-subtitle>
					<v-card-text class="text-h3">27632</v-card-text>
					<!-- Placeholder for chart -->
					<v-img src="https://via.placeholder.com/150x75.png?text=Chart" />
				</v-card>
			</v-col>

			<v-col cols="12" md="6" lg="3">
				<v-card>
					<v-card-title>CPU</v-card-title>
					<v-card-subtitle>55%</v-card-subtitle>
					<!-- Placeholder for chart -->
					<v-img src="https://via.placeholder.com/150x75.png?text=Chart" />
				</v-card>
				<v-card>
					<v-card-title>Memory</v-card-title>
					<v-card-subtitle>123,65</v-card-subtitle>
					<!-- Placeholder for chart -->
					<v-img src="https://via.placeholder.com/150x75.png?text=Chart" />
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<h2>Income statistics</h2>
			</v-col>
			<v-col cols="12">
				<v-card>
					<v-card-title>Monthly Increase</v-card-title>
					<v-card-subtitle class="d-flex">
						<span class="me-3">Register User</span>
						<span>Premium User</span>
					</v-card-subtitle>
					<v-card-text class="text-h3">67842</v-card-text>
					<!-- Placeholder for chart -->
					<v-img src="https://via.placeholder.com/300x150.png?text=Chart" />
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
