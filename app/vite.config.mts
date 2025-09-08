import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Fonts from 'unplugin-fonts/vite';
import Layouts from 'vite-plugin-vue-layouts-next';
import Vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import removeConsole from 'vite-plugin-remove-console';
import dotenv from 'dotenv';

dotenv.config();

const viteEnv:{} = Object.fromEntries(Object.entries(process.env).filter(([key]) => key.startsWith('VITE_')));

const { VITE_NAME, VITE_DESCRIPTION, VITE_HOST, VITE_PORT, VITE_HTTPS } = viteEnv;

/**
 * Converts a URL string into a file system path.
 */
const urlToAlias = (url: string): string => fileURLToPath(new URL(url, import.meta.url));

/**
 * Define alias paths
 */
const alias: Record<string, string> =
{
    '@': urlToAlias('./src'),
    '@assets': urlToAlias('./src/assets'),
    '@components': urlToAlias('./src/components'),
    '@i18n': urlToAlias('./src/i18n'),
    '@pages': urlToAlias('./src/pages'),
    '@plugins': urlToAlias('./src/plugins'),
    '@router': urlToAlias('./src/router'),
    '@script': urlToAlias('./src/script'),
    '@stores': urlToAlias('./src/stores'),
    '@styles': urlToAlias('./src/styles'),
    '@themes': urlToAlias('./src/themes'),
    '@app': urlToAlias('./src/app.ts'),
    '@book': urlToAlias('./src/book.ts'),
    '@types': urlToAlias('./src/types.ts'),
};

/**
 * Fonts configuration for Google Fonts
 */
const fonts = {
    google: {
        families: [
            {
                name: 'Roboto',
                styles: 'wght@100;300;400;500;700;900',
            },
        ],
    },
};

/**
 * Build configuration
 */
const build = ({mode}) =>
{
	return  {
		chunkSizeWarningLimit: 3000,
		sourcemap: true,
		rollupOptions: {
			output: {
				sourcemapIgnoreList: (sourcePath) => {
					return sourcePath.includes('node_modules/vuetify');
				},
			},
		},
	}
}
//VITE_HOST, , VITE_HTTPS

const startApp = ({mode}) =>
{
	console.log(`Starting Hero app mode: ${mode}`);
	console.log(`Vite env vars: ${JSON.stringify(viteEnv, null, 2)}`);


	return { server:server({mode}), build:build({mode}) };
};

/**
 * Server configuration
 */
const server = ({ mode }) =>
{
    return {
        port: VITE_PORT,
		host: VITE_HOST,
		https: VITE_HTTPS === 'true',
		allowedHosts: mode === 'development' ? true : [VITE_HOST],
		strictPort: true,
		sourcemap: false,
		cors: true,
		proxy:
		{
			// Proxying websockets or socket.io:
			// ws://localhost:5173/socket.io
			//   -> ws://localhost:5174/socket.io
			// Exercise caution using `rewriteWsOrigin` as it can leave the
			// proxying open to CSRF attacks.
			/*'/socket.io': {
				target: 'ws://localhost:5174',
				ws: true,
				rewriteWsOrigin: true,
			},*/
		}
    };
}

/**
 * Export the Vite configuration
 */
export default defineConfig(({ mode }) => {
    return {
        plugins: [
            VueRouter({ dts: 'src/typed-router.d.ts' }),
            Layouts(),
            AutoImport({
                imports: ['vue', { 'vue-router/auto': ['useRoute', 'useRouter'] }],
                dts: 'src/auto-imports.d.ts',
                eslintrc: { enabled: true },
                vueTemplate: true,
            }),
            Components({ dts: 'src/components.d.ts' }),
            Vue({ template: { transformAssetUrls } }),
            Vuetify({ autoImport: true, styles: { configFile: 'src/styles/settings.scss' } }),
            Fonts(fonts),
            VitePWA({
                registerType: 'autoUpdate',
                manifest: {
                    name: VITE_NAME,
                    short_name: VITE_NAME,
                    description: VITE_DESCRIPTION,
                    theme_color: '#6200EE',
                    icons: [
                        {
                            src: 'icon-192x192.png',
                            sizes: '192x192',
                            type: 'image/png',
                        },
                        {
                            src: 'icon-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                        },
                    ],
                },
            }),
            // Only include the removeConsole plugin in production mode
            mode === 'production' && removeConsole(),
        ],
        resolve: { alias, extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'] },
        ...startApp({mode})
    };
});
