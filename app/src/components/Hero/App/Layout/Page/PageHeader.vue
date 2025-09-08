<script lang="ts">
import { defineComponent } from 'vue';
import Particles from '@components/Logos/Particles/Particles.vue';

export default defineComponent({
	components: { Particles },
	props: {
		title: { type: String },
	},
	data() {
		return {
			backgroundCounter: 13,
			backgroundImage: '',
			breadcrumbItems: [{ text: 'Home', to: '/' }],
		};
	},
	methods: {
		onClick() {
			this.backgroundCounter = (this.backgroundCounter + 1) % 28;
			this.updateBackground();
		},
		updateBackground() {
			this.backgroundImage = `url('/assets/backgrounds/page/header/${this.backgroundCounter}.jpg')`;
		},
		updateBreadcrumb() {
			this.breadcrumbItems = [
				{ text: 'Home', to: '/' },
				{ text: (this.title || this.$route.meta.title) as string, to: this.$route.path },
			];
		},
	},
	created() {
		this.updateBreadcrumb();
	},
	mounted() {
		this.updateBackground();
	},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less">
.header-container {
	background-image: v-bind(backgroundImage);
	background-size: cover;
	background-repeat: no-repeat;
	background-position: top left;
	width: 100%;
	padding-bottom: 30px;
	color: white;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	max-width: 100%;
	overflow: hidden;
	position: relative;

	h1 {
		margin: 0;
	}
}

.router-link {
	color: inherit;
	text-decoration: none;
}

.breadcrumb-disabled {
	color: gray;
	cursor: default;
}

h1 {
	text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}

.settings-button {
	position: absolute;
	right: 10px;
	top: 10px;
	font-size: 30px;
}
</style>

<template>
	<v-container class="header-container elevation-2" @click="onClick">
		<!--
		<Particles />
		-->
		<v-breadcrumbs class="px-0 pb-0 text-body-2" divider="›">
			<v-breadcrumbs-item>
				<v-icon icon="mdi-view-dashboard" size="small"></v-icon>
				<router-link class="router-link" :to="breadcrumbItems[0].to">{{
					breadcrumbItems[0].text
				}}</router-link>
			</v-breadcrumbs-item>

			<v-icon
				icon="mdi-chevron-right"
				v-for="(_, index) in breadcrumbItems.slice(1).length"
				:key="'divider-' + index"
			></v-icon>

			<template v-for="(item, index) in breadcrumbItems.slice(1)" :key="index">
				<v-breadcrumbs-item v-if="index < breadcrumbItems.slice(1).length - 1">
					<router-link class="router-link" :to="item.to">{{ item.text }}</router-link>
				</v-breadcrumbs-item>
				<v-breadcrumbs-item v-else>
					<span class="breadcrumb-disabled">{{ item.text }}</span>
				</v-breadcrumbs-item>
			</template>
		</v-breadcrumbs>

		<div class="d-flex justify-space-between align-center flex-wrap">
			<h1 class="text-h5 text-md-h4 ps-1">{{ title }}</h1>
		</div>

		<i class="mdi mdi-cog-outline settings-button"></i>
	</v-container>
</template>
