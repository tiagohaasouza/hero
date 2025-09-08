<script>
import { defineComponent } from 'vue';
import Button from '@/components/Hero/HTML/Button/Button.vue';
import { useLayoutStore } from '@stores/layout';

export default defineComponent({
	components: { Button },
	props: {
		icon: { type: String, default: 'mdi-shape-outline' },
	},
	data() {
		return {
			layoutStore: useLayoutStore(),
			tooltipText: '',
		};
	},
	methods: {
		toggle() {
			//this.layoutStore.setThemeMode(this.$vuetify.theme.global.name as any);
			this.updateInterface();
		},
		updateInterface() {},
	},
	created() {
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
		<v-tooltip activator="parent" location="bottom">{{ $t(`layout.theme.switchTheme`) }}</v-tooltip>
		<v-icon>{{ icon }}</v-icon>
	</Button>
</template>
