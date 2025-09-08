<script>
import { defineComponent } from 'vue';
import Header from '@components/Hero/App/Layout/Header/Header.vue';
import Main from '@components/Hero/App/Layout/Page/Main.vue';
import ASideLeft from '@components/Hero/App/Layout/ASideLeft.vue';
import ThemesModal from '@components/Hero/UI/Dialog/Modal/ThemesModal.vue';
import ASideRight from '@components/Hero/App/Layout/ASideRight.vue';
import PageLoader from '@components/Hero/App/Layout/Page/PageLoader.vue';
import app from '@app';
import DebugBar from '@components/Hero/Debug/DebugBar.vue';
import Card from '@components/Hero/HTML/Card/Card.vue';

export default defineComponent({
	components: { DebugBar, ASideRight, ThemesModal, Header, ASideLeft, Main, PageLoader, Card },
	data() {
		return {
			aSidePreferences: false,
			drawer: true,
			pageLoading: true,
			asideLeft: null,
			isReady: false,
			fullPage: false,
			hasGlobalError: false,
			lastGlobalError: null,
		};
	},
	computed: {},
	methods: {
		onHeaderDrawer(drawer) {
			this.drawer = drawer;
		},
		onThemeChooserClick() {
			this.aSidePreferences = !this.aSidePreferences;
		},
		onPageCreated(e) {
			this.fullPage = e.detail.full;
		},
	},
	created() {
		app.on('page:created', this.onPageCreated);

		app.layout.observe('pageLoading', (value) => {
			this.pageLoading = value;
		});

		//const i18n = AppI18N.getInstance();

		//i18n.toString();
	},
	mounted() {
		setTimeout(() => {
			this.isReady = true;
		}, 1000);
	},
});
</script>

<style scoped lang="less">
.main-app {
}

.is-loading {
	opacity: 0;
}

.card {
	position: fixed;
	width: 100%;
}
</style>

<template>
	<transition name="fade" mode="in-out">
		<v-app class="main-app" :class="{ 'is-loading': !isReady }">
			<v-layout row fill-height>
				<ASideLeft v-if="!fullPage" ref="asideLeft" v-model="drawer" />

				<v-container fluid class="pa-0 d-flex flex-column">
					<Header
						v-if="!fullPage"
						ref="header"
						@drawer="onHeaderDrawer"
						@theme="onThemeChooserClick"
					/>
					<Main ref="main" />
					<Footer v-if="!fullPage" ref="footer" />
				</v-container>

				<ASideRight v-if="!fullPage" v-model="aSidePreferences" />
			</v-layout>
		</v-app>
	</transition>

	<transition name="fade" mode="in-out">
		<PageLoader v-if="pageLoading" />
	</transition>
</template>
