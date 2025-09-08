<script>
import { defineComponent } from 'vue';
import Button from '@/components/Hero/HTML/Button/Button.vue';
import { useLayoutStore } from '@stores/layout';

export default defineComponent({
	components: { Button },
	props: {
		darkModeIcon: { type: String, default: 'mdi-weather-night' },
		lightModeIcon: { type: String, default: 'mdi-weather-sunny' },
	},
	data() {
		return {
			layoutStore: useLayoutStore(),
			isDarkTheme: false,
			currentIcon: this.lightModeIcon,
			tooltipText: '',
		};
	},
	methods: {
		toggle() {
			this.isDarkTheme = !this.isDarkTheme;
			this.$vuetify.theme.global.name = this.isDarkTheme ? 'dark' : 'light';
			this.layoutStore.setThemeMode(this.$vuetify.theme.global.name);
			this.updateInterface();
		},
		updateInterface() {
			if (this.isDarkTheme) {
				this.currentIcon = this.darkModeIcon;
				this.tooltipText = 'switchToLight';
			} else {
				this.currentIcon = this.lightModeIcon;
				this.tooltipText = 'switchToDark';
			}
		},
	},
	created() {
		this.isDarkTheme = this.$vuetify.theme.global.name === 'dark';
		this.updateInterface();
	},
});
</script>

<style scoped lang="less">
.icon {
	pointer-events: none;
}
</style>

<template>
	<Button icon @click="toggle" v-bind="$attrs">
		<v-tooltip activator="parent" location="bottom">{{
			$t(`layout.theme.mode.${tooltipText}`)
		}}</v-tooltip>
		<v-icon>{{ currentIcon }}</v-icon>
	</Button>
</template>
