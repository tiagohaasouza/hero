declare module '@app' {
	import type AppLayout from '@script/Logos/Vue/App/Data/Layout/AppLayout';

	interface AppInstance {
		layout: AppLayout;
	}

	const app: AppInstance;
	export default app;
}
