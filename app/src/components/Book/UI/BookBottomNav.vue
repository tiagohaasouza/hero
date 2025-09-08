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
	props: {},
	data() {
		return { value: 1 };
	},
	methods: {},
	computed: {
		color() {
			switch (this.value) {
				case 0:
					return 'blue-grey';
				case 1:
					return 'teal';
				case 2:
					return 'brown';
				case 3:
					return 'indigo';
				default:
					return 'blue-grey';
			}
		},
	},
	created() {},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less">
.bottom-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
}
</style>

<template>
	<div class="bottom-nav">
		<v-layout class="overflow-visible" style="height: 56px">
			<v-bottom-navigation v-model="value" :bg-color="color" mode="shift">
				<v-btn>
					<v-icon>mdi-television-play</v-icon>

					<span>Video</span>
				</v-btn>

				<v-btn>
					<v-icon>mdi-music-note</v-icon>

					<span>Music</span>
				</v-btn>

				<v-btn>
					<v-icon>mdi-book</v-icon>

					<span>Book</span>
				</v-btn>

				<v-btn>
					<v-icon>mdi-image</v-icon>

					<span>Image</span>
				</v-btn>
			</v-bottom-navigation>
		</v-layout>
	</div>
</template>
