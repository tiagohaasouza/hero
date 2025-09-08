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
			value: [423, 446, 675, 510, 590, 610, 760],
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
.card {
	background: v-bind(color);
}
</style>

<template>
	<v-card class="mx-auto text-center card">
		<v-card-text>
			<v-sheet color="rgba(0, 0, 0, .12)">
				<v-sparkline
					:model-value="value"
					color="rgba(255, 255, 255, .7)"
					height="100"
					padding="24"
					stroke-linecap="round"
					smooth
				>
					<template v-slot:label="item"> ${{ item.value }} </template>
				</v-sparkline>
			</v-sheet>
		</v-card-text>

		<v-card-text>
			<div class="text-h4 font-weight-thin">Sales Last 24h</div>
		</v-card-text>

		<v-divider></v-divider>

		<v-card-actions class="justify-center">
			<v-btn variant="text" block> Go to Report </v-btn>
		</v-card-actions>
	</v-card>
</template>
