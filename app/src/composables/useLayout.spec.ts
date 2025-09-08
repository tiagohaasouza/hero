import { describe, it, expect } from 'vitest';
import { useLayout } from './useLayout';

describe('useLayout', () => {
        it('toggles sidebar visibility', () => {
                const { isSidebarOpen, toggleSidebar } = useLayout();
                expect(isSidebarOpen.value).toBe(false);
                toggleSidebar();
                expect(isSidebarOpen.value).toBe(true);
        });

        it('controls page loading state', () => {
                const { isPageLoading, showPageLoading, hidePageLoading } = useLayout();
                expect(isPageLoading.value).toBe(false);
                showPageLoading();
                expect(isPageLoading.value).toBe(true);
                hidePageLoading();
                expect(isPageLoading.value).toBe(false);
        });
});
