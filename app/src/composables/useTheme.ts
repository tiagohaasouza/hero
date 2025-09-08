import { computed, watch, onMounted, onUnmounted } from 'vue';
import { useTheme as useVuetifyTheme } from 'vuetify';
import { useLayoutStore } from '@stores/layout';
import { useUserStore } from '@stores/user';

export function useTheme() {
        const vuetifyTheme = useVuetifyTheme();
        const layoutStore = useLayoutStore();
        const userStore = useUserStore();

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        function apply(mode: 'light' | 'dark') {
                vuetifyTheme.global.name.value = mode;
                layoutStore.setThemeMode(mode);
        }

        function updatePreference(theme: string) {
                userStore.setPreferences({ ...userStore.preferences, theme });
        }

        function updateFromPreferences() {
                const pref = userStore.preferences.theme;
                if (pref === 'auto') {
                        apply(mediaQuery.matches ? 'dark' : 'light');
                } else {
                        apply((pref as 'light' | 'dark') || 'light');
                }
        }

        function toggle() {
                const newMode = layoutStore.themeMode === 'light' ? 'dark' : 'light';
                updatePreference(newMode);
                apply(newMode);
        }

        function enableAuto() {
                updatePreference('auto');
                updateFromPreferences();
        }

        function handleChange(e: MediaQueryListEvent) {
                if (userStore.preferences.theme === 'auto') {
                        apply(e.matches ? 'dark' : 'light');
                }
        }

        onMounted(() => {
                updateFromPreferences();
                mediaQuery.addEventListener('change', handleChange);
        });

        onUnmounted(() => {
                mediaQuery.removeEventListener('change', handleChange);
        });

        watch(
                () => userStore.preferences.theme,
                () => updateFromPreferences()
        );

        return {
                theme: computed(() => layoutStore.themeMode),
                isDark: computed(() => layoutStore.themeMode === 'dark'),
                toggle,
                enableAuto,
        };
}
