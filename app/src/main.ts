/// <reference path="./shims-vue.d.ts" />

import { registerPlugins } from './plugins';
import { createApp, App as VueApp } from 'vue';
import App from './components/App/App.vue';
import 'vuetify/styles';
import './styles/hero/style.less';
import '@mdi/font/css/materialdesignicons.css';
import '@app';

const app: VueApp<Element> = createApp(App);

registerPlugins(app);

app.mount('#app');
