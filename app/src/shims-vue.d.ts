import 'vue';
import { VueI18n } from 'vue-i18n';
import type { ILocale } from '@script/Logos/Vue/App/Interfaces/ILocale';

declare module '*.vue' {
	import { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

interface I18nGlobal {
	locale: string;
	setLocaleByCode(code: string): Promise<void>;
	loadLocale(code: string): Promise<void>;
	registeredLocales: ILocale[];
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$t: VueI18n['t'];
		$d: VueI18n['d'];
		$n: VueI18n['n'];
		$i18n: I18nGlobal;
		$refs: {
			[key: string]: any;
		};
		$emit: (event: string, ...args: any[]) => void;
		$nextTick: (callback: () => void) => Promise<void>;
		$slots: {
			[key: string]: (...args: any[]) => any;
		};
		$el: HTMLElement;
		$router: {
			push: (location: any) => Promise<void>;
			replace: (location: any) => Promise<void>;
			go: (n: number) => void;
			back: () => void;
			forward: () => void;
		};
		$route: {
			path: string;
			name?: string;
			params: Record<string, any>;
			query: Record<string, any>;
			hash: string;
			fullPath: string;
			meta: Record<string, any>;
		};
		$data: Record<string, any>;
		$props: Record<string, any>;
		$options: Record<string, any>;
		$watch: (source: string | Function, callback: Function) => void;
		$forceUpdate: () => void;
		$destroy: () => void;
	}
}
