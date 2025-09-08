/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import { ref, computed } from 'vue';
import { useLayoutStore } from '@stores/layout';

export function useLayout() {
        const layoutStore = useLayoutStore();

        const isSidebarOpen = computed({
                get: () => layoutStore.isSidebarOpen,
                set: (val: boolean) => (layoutStore.isSidebarOpen = val),
        });

        const themeMode = computed({
                get: () => layoutStore.themeMode,
                set: (val: 'light' | 'dark') => layoutStore.setThemeMode(val),
        });

        const isFullScreen = computed(() => layoutStore.isFullScreen);

        const isHeaderVisible = ref(true);
        const isFooterVisible = ref(true);
        const contextMenu = ref<unknown | null>(null);
        const isPageLoading = computed(() => layoutStore.showPageLoader);

        function toggleSidebar(): void {
                layoutStore.toggleSidebar();
        }

        function openSidebar(): void {
                layoutStore.openSidebar();
        }

        function closeSidebar(): void {
                layoutStore.closeSidebar();
        }

        function toggleThemeMode(): void {
                layoutStore.toggleThemeMode();
        }

        function toggleFullScreen(): void {
                layoutStore.toggleFullScreen();
        }

        function showHeader(): void {
                isHeaderVisible.value = true;
        }

        function hideHeader(): void {
                isHeaderVisible.value = false;
        }

        function showFooter(): void {
                isFooterVisible.value = true;
        }

        function hideFooter(): void {
                isFooterVisible.value = false;
        }

        const PAGE_KEY = 'global';
        function showPageLoading(pageName: string = PAGE_KEY): void {
                layoutStore.setPageLoading(pageName);
        }

        function hidePageLoading(pageName: string = PAGE_KEY): void {
                layoutStore.setPageLoaded(pageName);
        }

        function openContextMenu(menu: unknown): void {
                contextMenu.value = menu;
        }

        function closeContextMenu(): void {
                contextMenu.value = null;
        }

        return {
                isSidebarOpen,
                themeMode,
                isFullScreen,
                isHeaderVisible,
                isFooterVisible,
                isPageLoading,
                contextMenu,
                toggleSidebar,
                openSidebar,
                closeSidebar,
                toggleThemeMode,
                toggleFullScreen,
                showHeader,
                hideHeader,
                showFooter,
                hideFooter,
                showPageLoading,
                hidePageLoading,
                openContextMenu,
                closeContextMenu,
        };
}
