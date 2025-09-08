import { watch } from 'vue';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '@stores/user';

const THEME_KEY = 'settings.theme';
const LANGUAGE_KEY = 'settings.language';

export function useSettings() {
	const userStore = useUserStore();

	const theme = useStorage<string>(THEME_KEY, userStore.getTheme || 'light');
	const language = useStorage<string>(LANGUAGE_KEY, userStore.getLanguage || 'pt-br');

	watch(
		() => theme.value,
		(val) => {
			userStore.setPreferences({ ...userStore.getPreferences, theme: val });
		},
		{ immediate: true },
	);

	watch(
		() => language.value,
		(val) => {
			userStore.setPreferences({ ...userStore.getPreferences, language: val });
		},
		{ immediate: true },
	);

	const setTheme = (value: string): void => {
		theme.value = value;
	};

	const toggleTheme = (): void => {
		theme.value = theme.value === 'dark' ? 'light' : 'dark';
	};

	const setLanguage = (value: string): void => {
		language.value = value;
	};

	return {
		theme,
		language,
		setTheme,
		toggleTheme,
		setLanguage,
	};
}

export default useSettings;
