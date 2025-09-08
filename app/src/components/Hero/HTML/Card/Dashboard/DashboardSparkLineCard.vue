<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script lang="ts">
import { defineComponent } from 'vue';
import { getRandomCSSColor } from '@script/Logos/Util/layout';

export default defineComponent({
	components: {},
	props: {},
	data() {
		return {
			color: 'primary',
			labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
			value: [200, 675, 410, 390, 310, 460, 250, 240],
		};
	},
	methods: {},
	computed: {},
	created() {
		this.color = getRandomCSSColor();
	},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less">
.v-sheet--offset {
	top: -24px;
	position: relative;
	background: v-bind(color);
}
</style>

<template>
	<v-card class="mt-8 mx-auto overflow-visible">
		<v-sheet
			class="v-sheet--offset mx-auto"
			elevation="12"
			max-width="calc(100% - 32px)"
			rounded="lg"
		>
			<v-sparkline
				:labels="labels"
				:model-value="value"
				color="white"
				line-width="2"
				padding="16"
			></v-sparkline>
		</v-sheet>

		<v-card-text class="pt-0">
			<div class="text-h6 font-weight-light mb-2">User Registrations</div>
			<div class="subheading font-weight-light text-grey">Last Campaign Performance</div>
			<v-divider class="my-2"></v-divider>
			<v-icon class="me-2" size="small"> mdi-clock </v-icon>
			<span class="text-caption text-grey font-weight-light">last registration 26 minutes ago</span>
		</v-card-text>
	</v-card>
</template>
