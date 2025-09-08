<script lang="ts">
import { defineComponent } from 'vue';
import app from '@app';
import ILocale from '@script/Logos/Vue/App/Interfaces/ILocale';

export default defineComponent({
	data() {
		return {
			languages: app.i18n.registeredLocales as ILocale[],
			selected: '',
			search: '',
			menuValue: '',
			loading: false,
		};
	},
	methods: {
		async selectLanguage(languageCode: string): Promise<void> {
			this.selected = languageCode;
			await app.i18n.loadLocale(languageCode);
			localStorage.setItem('selectedLanguage', languageCode);
			this.search = '';
		},
		getInitialLanguage(): string {
			const localStorageLang = localStorage.getItem('selectedLanguage');
			return localStorageLang || this.$i18n.locale;
		},
		onInputClick(e: Event): void {
			e.stopPropagation();
		},
		onEnterPress(e: KeyboardEvent): void {
			if (this.filteredLanguages.length === 1) {
				this.selectLanguage(this.filteredLanguages[0].code);
			}
		},
	},
	computed: {
		currentLanguage(): ILocale {
			return this.languages.find((lang) => lang.code === this.selected) || this.languages[0];
		},
		filteredLanguages(): ILocale[] {
			return this.languages.filter((lang) =>
				lang.name.toLowerCase().includes(this.search.toLowerCase()),
			);
		},
	},
	created() {
		this.selected = this.getInitialLanguage();
		this.$i18n.locale = this.selected;
	},
	watch: {
		'$i18n.locale'(newLocale: string): void {
			this.selected = newLocale;
		},
	},
});
</script>

<style scoped lang="less">
.language-avatar {
	border-radius: 0;
}
.language-card {
	padding: 8px 16px;
}
.language-text-field {
	margin-top: 8px;
	margin-bottom: 8px;
}
</style>

<template>
	<v-menu ref="menu">
		<template #activator="{ props }">
			<v-btn v-bind="props" icon>
				<v-tooltip activator="parent" location="bottom">{{
					$t('localization.language.change')
				}}</v-tooltip>
				<v-avatar size="32" class="language-avatar">
					<img :src="currentLanguage.flag" :alt="currentLanguage.name" />
				</v-avatar>
			</v-btn>
		</template>

		<v-card class="language-card">
			<v-text-field
				v-model="search"
				:loading="loading"
				append-inner-icon="mdi-magnify"
				density="compact"
				:label="$t('localization.language.filter')"
				variant="outlined"
				hide-details
				single-line
				@click.stop
				@keyup.enter="onEnterPress"
				class="language-text-field"
			></v-text-field>
			<v-list class="language-menu">
				<v-divider />
				<v-list-item
					v-for="language in filteredLanguages"
					:key="language.code"
					@click="selectLanguage(language.code)"
					:disabled="language.code === selected"
					tabindex="0"
				>
					<template #prepend>
						<v-avatar size="32" class="language-avatar">
							<img :src="language.flag" :alt="language.name" />
						</v-avatar>
					</template>
					<span>{{ language.name }}</span>
				</v-list-item>
			</v-list>
		</v-card>
	</v-menu>
</template>
