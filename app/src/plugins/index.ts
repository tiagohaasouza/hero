import vuetify from './vuetify';
import pinia from '../stores';
import router from '../router';
import i18n from '../i18n';
import '../error';
import '../ui';
import '../database';
import type { App, Plugin } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const apexChartsPlugin: Plugin = VueApexCharts;

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((registration: ServiceWorkerRegistration) => {
				//console.log('Service Worker registrado com sucesso:', registration);
			})
			.catch((err) => {
				//console.log('Erro ao registrar o Service Worker:', err);
			});
	});
}

export const registerPlugins = (app: App): App => {
	return app.use(vuetify).use(router).use(pinia).use(i18n).use(apexChartsPlugin);
};
