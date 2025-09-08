<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script lang="ts">
import { defineComponent } from 'vue';
import { Bokeh1Background } from 'threejs-components/build/backgrounds/bokeh1.cdn.min.js';

export default defineComponent({
	components: {},
	props: {
		texturePath: {
			type: String,
			default: '/textures/bokeh/bokeh.png',
		},
	},
	data() {
		let background: Bokeh1Background | null = null;
		let colors: number[] = [0x6d4862, 0xfd826c, 0x22ccc1];
		return { background, colors };
	},
	methods: {
		onOverlayClick() {
			this.background.setColors([
				0xffffff * Math.random(),
				0xffffff * Math.random(),
				0xffffff * Math.random(),
			]);
		},
	},
	computed: {},
	created() {},
	mounted() {
		this.background = Bokeh1Background(this.$refs.canvas);
		this.background.loadMap(this.texturePath);
		this.background.setColors(this.colors);
	},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less">
.bokeh-background,
.canvas,
.overlay {
	max-height: 100vh;
}

.bokeh-background {
	position: relative;
	margin: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	touch-action: pan-y;
}

.canvas {
	z-index: 1;
}

.overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0);
}
</style>

<template>
	<div class="bokeh-background">
		<canvas ref="canvas" class="canvas"></canvas>

		<div ref="overlay" class="overlay" @click="onOverlayClick"></div>

		<slot />
	</div>
</template>
