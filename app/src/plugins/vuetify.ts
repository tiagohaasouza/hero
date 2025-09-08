// src/plugins/vuetify.ts
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as themes from '@/themes';

export default createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'light',
		themes,
	},
});
