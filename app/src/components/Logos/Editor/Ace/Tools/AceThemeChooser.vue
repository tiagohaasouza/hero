<script>
import { defineComponent } from 'vue';
import SelectMenu from '@components/Logos/Menu/SelectMenu.vue'; // Importa o componente SelectMenu

export default defineComponent({
	components: {
		SelectMenu,
	},
	props: {
		themes: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			theme: 'monokai',
		};
	},
	methods: {
		updateTheme(theme) {
			this.theme = theme;
			this.$emit('change', theme);
		},
	},
});
</script>

<template>
	<SelectMenu
		:items="themes"
		item-key="id"
		item-label="name"
		:selected="theme"
		search-placeholder="Search themes"
		activator-tooltip="Choose theme"
		@update:selected="updateTheme"
	/>
</template>
