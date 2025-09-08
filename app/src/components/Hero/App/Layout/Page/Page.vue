<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';
import PageLoader from '@components/Hero/App/Layout/Page/PageLoader.vue';
import { VPullToRefresh } from 'vuetify/labs/VPullToRefresh';
import app from '@app';

export default defineComponent({
	components: { PageLoader, VPullToRefresh },
	props: {
		name: String,
		type: { type: String, default: 'default' },
		pullToRefresh: { type: Boolean, default: false },
		pullDownThreshold: { type: Number, default: 64 },
		scrollContainer: { type: Boolean, default: false },
		transition: { type: Object, default: () => ({ in: 'fade', out: 'fade' }) },
		goToTopButton: { type: Boolean, default: true },
		full: { type: Boolean, default: false },
		requireAuthentication: { type: Boolean, default: false },
		roleRequired: { type: String, default: '*' },
	},
	data() {
		return {
			isReady: false,
			isAppReady: false,
			isPreloaderReady: false,
			isLoaded: false,
			backgroundImage: null,
			dataURI: '',
			isToShowGoToTopButton: false,
			items: [
				{
					title: '1',
					value: 1,
				},
				{
					title: '2',
					value: 2,
				},
				{
					title: '3',
					value: 3,
				},
			],
		};
	},
	methods: {
		async load({ done }) {
			// Perform API call
			console.log('loading');
			await new Promise((resolve) => setTimeout(() => resolve(), 2000));
			this.items = Array.from({ length: 3 }, (_, v) => ({
				title: `${v + 1}`,
				value: v + 1,
			}));
			console.log('load finish');
			done('ok');
		},
		checkGoToTopButton() {
			if (!this.goToTopButton || !this.$refs.container) {
				this.isToShowGoToTopButton = false;
				return;
			}
			this.isToShowGoToTopButton = this.$refs.container.clientHeight > window.innerHeight;
		},
		onWindowResize(e) {
			this.checkGoToTopButton();
		},
	},
	created() {
		app.dispatch('page:created', { full: this.full });
		app.layout.showPageLoading();
	},
	mounted() {
		setTimeout(() => app.layout.hidePageLoading(), 1000 + Math.random() * 3000);
		window.addEventListener('resize', this.onWindowResize);
		this.checkGoToTopButton();
	},
	computed: {},
	beforeUnmount() {
		window.removeEventListener('resize', this.onWindowResize);
	},
	unmounted() {},
});
</script>

<style scoped lang="less">
.page-container {
	position: relative;
}
</style>

<template>
	<div ref="container" class="page-container" :class="{ full }">
		<slot name="background" />

		<v-pull-to-refresh :pull-down-threshold="pullDownThreshold" @load="load">
			<div class="page">
				<slot name="header" />

				<slot />

				<slot name="footer" />
			</div>
		</v-pull-to-refresh>

		<GoToTopButton v-if="isToShowGoToTopButton" />
	</div>
</template>
