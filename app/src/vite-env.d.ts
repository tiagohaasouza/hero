/// <reference types="vite/client" />
import 'vue-i18n';

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module 'vue' {
	interface ComponentCustomProperties {}
}
