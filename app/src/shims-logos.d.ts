declare module '@script/Logos/Util/dom' {
	export function randomID(): string;
	export function onDOMReady(cb: () => void): void;
}

declare module '@script/Logos/Vue/App/App' {
	export default class App {
		protected constructor();
		protected createRouter(): Promise<this>;
		protected createI18n(): Promise<this>;
		protected createLayout(): Promise<this>;
		create(): Promise<this>;
	}
}

declare module '@script/Logos/Vue/App/Interfaces/ILocale' {
	export interface ILocale {
		code: string;
		name: string;
		flag?: string;
	}
	export default ILocale;
}

declare module '@script/Logos/Vue/App/Data/I18N/AppI18N' {
	export default class AppI18N {
		static additionalI18NFiles(files: string[]): void;
	}
}

declare module '@script/Logos/Vue/App/Data/Router/AppRouter' {
	import type { Router } from 'vue-router';
	interface RouteConfig {
		path: string;
		name: string;
		component: string;
		meta?: Record<string, string | number | boolean>;
	}
	export default class AppRouter {
		router: Router;
		add(routes: RouteConfig[], options?: { guards?: Array<new () => object> }): void;
		notFound(): void;
		beforeEach(cb: (to: unknown, from: unknown, next: (val?: unknown) => void) => void): void;
		navigateByPath(path: string): void;
		urlParam(name: string): string | null;
		push(path: string): Promise<void>;
	}
}

declare module '@script/Logos/Vue/App/Data/Layout/AppLayout' {
	export default class AppLayout {
		showPageLoading(): void;
	}
}

declare module '@script/Logos/Vue/App/Router/Guard/AuthenticationGuard' {
	export default class AuthenticationGuard {}
}

declare module '@script/Logos/Vue/App/Data/AppData' {
	import type AppRouter from '@script/Logos/Vue/App/Data/Router/AppRouter';
	import type AppI18N from '@script/Logos/Vue/App/Data/I18N/AppI18N';
	export default class AppData {
		static getInstance(): { router: AppRouter; i18n: AppI18N };
	}
}

declare module '@script/Logos/Util/string' {
	export function countWordsFromHTML(html: string): number;
}

declare module '@script/Logos/Timer/Timer' {
	export default class Timer {
		static delay(seconds: number): Promise<void>;
	}
}

declare module '@script/Logos/DataBase/IndexedDBImages' {
	export default class IndexedDBImages {
		constructor(name?: string);
		static deleteDatabase(name: string): Promise<void>;
	}
}

declare module '@script/Logos/Event/EventDispatcher' {
	export default class EventDispatcher {
		addEventListener(type: string, listener: () => void): void;
		removeEventListener(type: string, listener: () => void): void;
		dispatchEvent(type: string): void;
	}
}

declare module '@script/Logos/Error/CatchableError' {
	export default class CatchableError extends Error {
		constructor(message: string, args?: string[], code?: number, fatal?: boolean);
		code: number;
		fatal: boolean;
	}
}

declare module '@script/Logos/Debug/Debug' {
	export default class Debug {
		static IS_DEVELOPMENT: boolean;
		static drawIErrorTable(error: Error, originalError?: Error): void;
	}
}

declare module '@script/Logos/Observer/ObservableObject' {
	export default class ObservableObject {}
}

declare module '@script/Logos/Vue/App/App' {
	import AppI18N from '@script/Logos/Vue/App/Data/I18N/AppI18N';
	import AppRouter from '@script/Logos/Vue/App/Data/Router/AppRouter';
	import AppLayout from '@script/Logos/Vue/App/Data/Layout/AppLayout';
	export default class App {
		i18n: AppI18N;
		router: AppRouter;
		layout: AppLayout;
		protected createRouter(): Promise<this>;
		protected createI18n(): Promise<this>;
		protected createLayout(): Promise<this>;
	}
}

declare module '@script/Logos/Vue/App/Router/Guard/AuthenticationGuard' {
	export default class AuthenticationGuard {}
}

declare module '@script/Logos/Vue/App/Data/AppData' {
	import AppI18N from '@script/Logos/Vue/App/Data/I18N/AppI18N';
	import AppRouter from '@script/Logos/Vue/App/Data/Router/AppRouter';
	export default class AppData {
		router: {
			add(
				routes: Array<{
					path: string;
					name: string;
					component: string;
					meta?: Record<string, string | number | boolean>;
				}>,
				options?: { guards?: Array<new () => object> },
			): void;
			notFound(): void;
		};
		i18n: {
			enableLocales(locales: string[]): void;
			resolveLocale(): Promise<void>;
		};
		static getInstance(): AppData;
	}
}

declare module '@script/Logos/Dialog/SweetAlert' {
	export interface NativeAlertOptions {
		borderless: boolean;
	}
	export default class SweetAlert {
		static nativeAlertOptions: NativeAlertOptions;
		static replaceNativeAlert(options: NativeAlertOptions): void;
	}
}
