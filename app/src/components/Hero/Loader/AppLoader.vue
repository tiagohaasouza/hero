<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';
import { randomID } from '@app/*';
import logo from '@/assets/logo.png';
import Particles from '@components/Logos/Particles/Particles.vue';

export default defineComponent({
	components: { Particles },
	emits: ['show', 'hide', 'loaded'],
	props: {},
	data() {
		let isParticlesRendered = false;
		return { logo, isParticlesRendered };
	},
	methods: {
		show() {
			this.$emit('show');
		},
		hide() {
			this.$emit('hide');
		},
		async onParticlesLoaded(container) {
			setTimeout(() => {
				this.isParticlesRendered = true;
				this.$emit('loaded');
			}, 3000);
		},
	},
	computed: {},
	created() {},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less">
.background {
	--color-top-right: #ff005e;
	--color-bottom-left: #00d0ff;

	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	background: linear-gradient(-135deg, var(--color-top-right), var(--color-bottom-left));
	z-index: 9999;
	display: table;
	width: 100%;
}

.center {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: auto;
	text-align: center;
	margin: 0 auto;
}

.background.mask {
	z-index: 999999999999;
}
</style>

<template>
	<div class="app-loader">
		<div class="background">
			<div class="center">
				<img :src="logo" alt="Hero" />
			</div>
		</div>

		<v-fade-transition>
			<div v-if="!isParticlesRendered" class="background mask"></div>
		</v-fade-transition>
	</div>

	<Particles @loaded="onParticlesLoaded" />
</template>
