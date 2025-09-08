<script lang="ts">
import { defineComponent } from 'vue';
import SelectMenu from '@components/Logos/Menu/SelectMenu.vue';
import app from '@app';
import ILocale from '@script/Logos/Vue/App/Interfaces/ILocale';

export default defineComponent({
	components: { SelectMenu },
	props: {
		flagsURL: { type: String, default: '/assets/flags/' },
	},
	data() {
		return {
			locales: [...app.i18n.enabledLocales].map((locale: ILocale) => ({
				...locale,
				flag: `${this.flagsURL}${locale.flag}`,
			})),
			loading: false,
		};
	},
	created() {},
	mounted() {
		//console.log('enabledLocales', this.locales);
	},
	computed: {
		currentLanguage(): string {
			return this.$i18n.locale;
		},
	},
	methods: {
		async changeLanguage(code: string): Promise<void> {
			await app.i18n.setLocaleByCode(code);
		},
	},
});
</script>

<template>
	<SelectMenu
		:items="locales"
		item-key="code"
		item-label="name"
		item-image="flag"
		:selected="currentLanguage"
		:loading="loading"
		:search-placeholder="$t('localization.language.filter')"
		:activator-tooltip="$t('localization.language.change')"
		@update:selected="changeLanguage"
	/>
</template>
