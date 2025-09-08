/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
	state: () => ({
		headerMode: 'static' as 'static' | 'fixed',
		asideLeftMode: 'static' as 'static' | 'fixed',
		asideRightMode: 'static' as 'static' | 'fixed',
		footerMode: 'static' as 'static' | 'fixed',
		headerPosition: 'top' as 'top' | 'bottom',
		asideLeftPosition: 'left' as 'left' | 'right',
		asideRightPosition: 'right' as 'left' | 'right',
		footerPosition: 'bottom' as 'top' | 'bottom',
		fullScreen: false as boolean,
		theme: 'default' as string,
		themeMode: 'light' as 'light' | 'dark',
		pageUnloading: '' as string | null | undefined,
		pageLoading: '' as string | null | undefined,
		pageUnloaded: '' as string | null | undefined,
		pageLoaded: '' as string | null | undefined,
	}),
	getters: {
		isHeaderFixed: (state) => state.headerMode === 'fixed',
		isAsideLeftFixed: (state) => state.asideLeftMode === 'fixed',
		isAsideRightFixed: (state) => state.asideRightMode === 'fixed',
		isFooterFixed: (state) => state.footerMode === 'fixed',
		isFullScreen: (state) => state.fullScreen,
		getTheme: (state) => state.theme,
		getThemeMode: (state) => state.themeMode,
		getPageUnloading: (state) => state.pageUnloading,
		getPageLoading: (state) => state.pageLoading,
		getPageUnloaded: (state) => state.pageUnloaded,
		getPageLoaded: (state) => state.pageLoaded,
		showPageLoader: (state) => !!state.pageLoading || !!state.pageUnloading,
	},
	actions: {
		setPageUnloading(pageName: string | null | undefined) {
			console.log(`Page [${pageName}] is UNLOADING`);
			this.pageUnloading = pageName;
			if (pageName) {
				if (this.pageLoading === pageName) this.pageLoading = null;
				if (this.pageLoaded === pageName) this.pageLoaded = null;
				if (this.pageUnloaded === pageName) this.pageUnloaded = null;
			}
		},
		setPageLoading(pageName: string | null | undefined) {
			console.log(`Page [${pageName}] is LOADING`);
			this.pageLoading = pageName;
			if (pageName) {
				if (this.pageUnloading === pageName) this.pageUnloading = null;
				if (this.pageLoaded === pageName) this.pageLoaded = null;
				if (this.pageUnloaded === pageName) this.pageUnloaded = null;
			}
		},
		setPageUnloaded(pageName: string | null | undefined) {
			console.log(`Page [${pageName}] is UNLOADED`);
			this.pageUnloaded = pageName;
			if (pageName) {
				if (this.pageLoading === pageName) this.pageLoading = null;
				if (this.pageLoaded === pageName) this.pageLoaded = null;
				if (this.pageUnloading === pageName) this.pageUnloading = null;
			}
		},
		setPageLoaded(pageName: string | null | undefined) {
			console.log(`Page [${pageName}] is LOADED`);
			this.pageLoaded = pageName;
			if (pageName) {
				if (this.pageLoading === pageName) this.pageLoading = null;
				if (this.pageUnloading === pageName) this.pageUnloading = null;
				if (this.pageUnloaded === pageName) this.pageUnloaded = null;
			}
		},
		setThemeMode(mode: 'light' | 'dark') {
			this.themeMode = mode;
		},
		toggleThemeMode() {
			this.themeMode = this.themeMode === 'light' ? 'dark' : 'light';
		},
		setTheme(theme: string) {
			this.theme = theme;
		},
		setHeaderMode(mode: 'static' | 'fixed') {
			this.headerMode = mode;
		},
		setAsideLeftMode(mode: 'static' | 'fixed') {
			this.asideLeftMode = mode;
		},
		setAsideRightMode(mode: 'static' | 'fixed') {
			this.asideRightMode = mode;
		},
		setFooterMode(mode: 'static' | 'fixed') {
			this.footerMode = mode;
		},
		setHeaderPosition(position: 'top' | 'bottom') {
			this.headerPosition = position;
		},
		setAsideLeftPosition(position: 'left' | 'right') {
			this.asideLeftPosition = position;
		},
		setAsideRightPosition(position: 'left' | 'right') {
			this.asideRightPosition = position;
		},
		setFooterPosition(position: 'top' | 'bottom') {
			this.footerPosition = position;
		},
		toggleFullScreen() {
			this.fullScreen = !this.fullScreen;
		},
	},
});
