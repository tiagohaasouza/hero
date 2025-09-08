<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script lang="ts">
import { defineComponent } from 'vue';
import CSS from '@script/Logos/HTML/CSS';

export default defineComponent({
	components: {},
	props: {
		icon: { type: String },
		title: { type: String },
		subTitle: { type: String },
		text: { type: String },
		color: { type: String },
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
.card-gradient {
	color: white;
	padding: 20px;
	position: relative;
}

.blue-gradient {
	background: linear-gradient(45deg, #2196f3, #21cbf3);
}

.pink-gradient {
	background: linear-gradient(45deg, #e91e63, #f06292);
}

.orange-gradient {
	background: linear-gradient(45deg, #ff9800, #ffb74d);
}

.green-gradient {
	background: linear-gradient(45deg, #4caf50, #81c784);
}

.v-icon {
	font-size: 24px;
}

.background-icon {
	position: absolute;
	bottom: 0;
	right: 0;
	font-size: 110px;
	opacity: 0.3;
	z-index: 0;
}

.text {
	font-size: 36px;
	text-align: right;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	font-weight: 400;
}
</style>

<template>
	<v-card class="card-gradient" :class="`${color}-gradient`">
		<v-icon class="background-icon">{{ icon }}</v-icon>

		<v-card-title class="d-flex align-center">
			<v-icon class="mr-2">{{ icon }}</v-icon>

			{{ title }}
		</v-card-title>

		<v-card-subtitle>{{ subTitle }}</v-card-subtitle>

		<v-card-text class="text">{{ text }}</v-card-text>
	</v-card>
</template>
