<script>
import { defineComponent } from 'vue';
import { VBtn, VIcon } from 'vuetify/components';
import Button from '@/components/Hero/HTML/Button/Button.vue';
import {
	isFullScreen,
	toggleFullscreen,
	enterFullscreen,
	exitFullscreen,
} from '@script/Logos/Util/ui';

export default defineComponent({
	components: { VBtn, VIcon, Button },
	props: {
		fullScreenIcon: { type: String, default: 'mdi-fullscreen' },
		fullScreenExitIcon: { type: String, default: 'mdi-fullscreen-exit' },
	},
	data() {
		return {
			currentIcon: this.fullScreenIcon,
			tooltipText: 'Toggle fullscreen',
			fullScreen: false,
			f11Pressed: false,
		};
	},
	methods: {
		toggleFullscreen() {
			if (this.f11Pressed) {
				this.f11Pressed = false;
				exitFullscreen();
			} else toggleFullscreen();

			this.update();
			this.$emit('fullscreen', { isFullscreen: this.fullScreen });
		},
		update() {
			this.fullScreen = isFullScreen();
			this.updateInterface();
		},
		updateInterface() {
			if (this.fullScreen) {
				this.currentIcon = this.fullScreenExitIcon;
				this.tooltipText = this.$t('layout.screen.fullscreen.exit');
			} else {
				this.currentIcon = this.fullScreenIcon;
				this.tooltipText = this.$t('layout.screen.fullscreen.enter');
			}
		},
		onClick(e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			this.toggleFullscreen();
		},
		onKeyUp(e) {
			if (e.key === 'F11') {
				this.f11Pressed = true;
				this.fullScreen = !this.fullScreen;
				this.updateInterface();
			}
		},
	},
	created() {
		this.update();
	},
	mounted() {
		document.addEventListener('keyup', this.onKeyUp);
		document.addEventListener('fullscreenchange', this.update);
	},
	beforeUnmount() {
		document.removeEventListener('keyup', this.onKeyUp);
		document.removeEventListener('fullscreenchange', this.update);
	},
});
</script>

<style scoped lang="less">
.icon {
	pointer-events: none;
}
</style>

<template>
	<Button icon @click="onClick" v-bind="$attrs">
		<v-tooltip activator="parent" location="bottom">{{ tooltipText }}</v-tooltip>
		<v-icon ref="iconRef" class="icon">{{ currentIcon }}</v-icon>
	</Button>
</template>
