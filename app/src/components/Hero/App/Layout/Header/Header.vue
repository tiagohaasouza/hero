<script>
import { defineComponent } from 'vue';

import SearchInput from '@components/Hero/App/Layout/Header/SearchInput.vue';
import NotificationMenu from '@components/Hero/App/Layout/Header/NotificationMenu.vue';
import LocalesMenu from '@components/Hero/App/Layout/Header/LocalesMenu.vue';
import FullScreenButton from '@components/Hero/HTML/Button/FullScreenButton.vue';
import ChatButton from '@components/Hero/HTML/Button/ChatButton.vue';
import ThemeChooserButton from '@components/Hero/HTML/Button/ThemeChooserButton.vue';

import { isFullScreenSupported as uiIsFullScreenSupported } from '@script/Logos/Util/ui';

export default defineComponent({
	components: {
		ThemeChooserButton,
		ChatButton,
		FullScreenButton,
		LocalesMenu,
		NotificationMenu,
		SearchInput,
	},
	data() {
		return {
			drawer: true,
			isFullscreen: false,
			searchQuery: '',
		};
	},
	created() {},
	computed: {
		isFullScreenSupported() {
			return uiIsFullScreenSupported();
		},
	},
	methods: {
		onDrawerClick() {
			this.drawer = !this.drawer;
			this.$emit('drawer', this.drawer);
		},
		onThemeChooserClick() {
			this.$emit('theme');
		},
	},
});
</script>

<style scoped lang="less">
.main-app-bar {
	min-height: 70px;
}
</style>

<template>
	<div class="header-container">
		<v-app-bar class="elevation-2 main-app-bar" v-bind="$attrs" app>
			<v-app-bar-nav-icon @click="onDrawerClick" />

			<SearchInput />

			<v-spacer />

			<FullScreenButton v-if="isFullScreenSupported" />

			<ThemeModeButton />

			<NotificationMenu />

			<ChatButton />

			<LocalesMenu />

			<ThemeChooserButton @click="onThemeChooserClick" />

			<UserMenu />
		</v-app-bar>
	</div>
</template>
