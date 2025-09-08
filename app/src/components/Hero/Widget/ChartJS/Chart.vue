<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';

export default defineComponent({
	components: {},
	props: {
		title: { type: String },
	},
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
.chart-container {
	position: relative;
	min-height: 300px;
}
</style>

<template>
	<v-card>
		<v-card-title>{{ title }}</v-card-title>

		<v-card-text>
			<div class="chart-container">
				<slot />
			</div>
		</v-card-text>
	</v-card>
</template>
