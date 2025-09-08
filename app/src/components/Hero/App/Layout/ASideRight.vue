<script lang="ts">
import { defineComponent } from 'vue';
import * as themes from '@/themes';
import ThemePreviewThumbnail from '@components/Logos/Tool/Theme/ThemePreviewThumbnail.vue';

export default defineComponent({
	components: { ThemePreviewThumbnail },
	data() {
		return {
			showPreferences: false,
			activeTab: 0,
			preferences: {
				darkMode: false, // Define o estado inicial como Light Mode
				autoSave: true,
				username: '',
				theme: '',
				emailNotifications: true,
				smsNotifications: false,
			},
			themes,
		};
	},
	computed: {
		filteredThemes() {
			// Filtra os temas com base no modo atual (Light/Dark)
			return Object.entries(this.themes).filter(([key, theme]) => {
				if (this.preferences.darkMode) {
					return key.toLowerCase().includes('dark');
				} else {
					return key.toLowerCase().includes('light');
				}
			});
		},
	},
	methods: {
		toggleDarkMode() {
			this.preferences.darkMode = !this.preferences.darkMode;
		},
	},
});
</script>

<style scoped lang="less">
.fixed {
	position: fixed;
}

.top-0 {
	top: 0;
}

.right-0 {
	right: 0;
}

.m-2 {
	margin: 0.5rem;
}

.theme-list {
	text-align: center;
}

.theme-list-item {
	display: inline-block;
}
</style>

<template>
	<div class="aside-right-container">
		<v-navigation-drawer location="right" v-bind="$attrs" temporary no-overlay width="800" sticky>
			<template v-slot:prepend>
				<v-list-item
					lines="two"
					:subtitle="$t('layout.theme.current') + ': ' + preferences.theme"
					:title="$t('layout.theme.switchTheme')"
				/>

				<v-list-item>
					<v-switch
						v-model="preferences.darkMode"
						:label="$t('layout.theme.toggleDarkMode')"
						class="mt-4"
						@change="toggleDarkMode"
					/>
				</v-list-item>
			</template>

			<v-divider />

			<v-list density="compact" nav class="theme-list">
				<v-list-item
					v-for="[key, theme] in filteredThemes"
					:key="key"
					@click="preferences.theme = key"
					class="theme-list-item"
				>
					<ThemePreviewThumbnail :name="key" :theme="theme" />
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>
