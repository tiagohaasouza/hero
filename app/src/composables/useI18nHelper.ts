import { createI18n, type I18n } from 'vue-i18n';
import { ref } from 'vue';

export interface LocaleInfo {
	code: string;
	name: string;
	flag?: string;
	country?: string;
	timezone?: string;
}

export interface I18nHelper {
	i18n: I18n;
	t: (key: string, params?: Record<string, unknown>) => string;
	d: (value: number | Date, key?: string) => string;
	n: (value: number, key?: string) => string;
	locale: any;
	enabledLocales: LocaleInfo[];
	enableLocales: (codes: string[]) => Promise<void>;
	additionalI18NFiles: (files: string[]) => void;
	resolveLocale: () => Promise<void>;
	setLocaleByCode: (code: string) => Promise<void>;
}

let instance: I18nHelper | null = null;

export function useI18nHelper(): I18nHelper {
	if (instance) return instance;

	const i18n = createI18n({
		legacy: false,
		locale: 'en',
		fallbackLocale: 'en',
		messages: {},
		datetimeFormats: {},
		numberFormats: {},
	});

	const extraFiles: string[] = [];
	const enabledLocales = ref<LocaleInfo[]>([]);
	const loaded = new Set<string>();

	function additionalI18NFiles(files: string[]): void {
		extraFiles.push(...files);
	}

	async function enableLocales(codes: string[]): Promise<void> {
		const locales: LocaleInfo[] = [];
		for (const code of codes) {
			try {
				const mod = await import(`../i18n/locales/${code}/${code}.json`);
				const data = mod.default ?? mod;
				if (data.metadata) {
					locales.push(data.metadata as LocaleInfo);
				} else {
					locales.push({ code, name: code });
				}
			} catch (_) {
				locales.push({ code, name: code });
			}
		}
		enabledLocales.value = locales;
	}

	async function loadLocale(code: string): Promise<void> {
		if (loaded.has(code)) return;

		async function safeImport(path: string): Promise<any> {
			try {
				const mod = await import(path);
				return mod.default ?? mod;
			} catch (_) {
				return {};
			}
		}

		const modules = [safeImport(`../i18n/locales/${code}/${code}.json`)];
		for (const file of extraFiles) {
			modules.push(safeImport(`../i18n/locales/${code}/${file}.json`));
		}
		const resolved = await Promise.all(modules);
		let messages: Record<string, unknown> = {};
		let meta: LocaleInfo | undefined;
		let dtf: Record<string, any> = {};
		let nf: Record<string, any> = {};
		for (const data of resolved) {
			if (data.metadata) {
				meta = data.metadata as LocaleInfo;
				if (data.dateTimeFormats) dtf = data.dateTimeFormats;
				if (data.numberFormats) nf = data.numberFormats;
				delete data.metadata;
				delete data.dateTimeFormats;
				delete data.numberFormats;
			}
			messages = { ...messages, ...data };
		}
		i18n.global.setLocaleMessage(code, messages);
		if (Object.keys(dtf).length) i18n.global.setDateTimeFormat(code, dtf);
		if (Object.keys(nf).length) i18n.global.setNumberFormat(code, nf);
		if (meta && !enabledLocales.value.find((l) => l.code === meta!.code)) {
			enabledLocales.value.push(meta);
		}
		loaded.add(code);
	}

	async function setLocaleByCode(code: string): Promise<void> {
		await loadLocale(code);
		i18n.global.locale.value = code;
	}

	async function resolveLocale(): Promise<void> {
		const browser = navigator.language.toLowerCase();
		const match =
			enabledLocales.value.find((l) => l.code.toLowerCase() === browser) ||
			enabledLocales.value.find((l) => browser.startsWith(l.code.split('-')[0]));
		const target = match ? match.code : enabledLocales.value[0]?.code || 'en';
		await setLocaleByCode(target);
	}

	instance = {
		i18n,
		t: i18n.global.t,
		d: i18n.global.d,
		n: i18n.global.n,
		locale: i18n.global.locale,
		get enabledLocales() {
			return enabledLocales.value;
		},
		enableLocales,
		additionalI18NFiles,
		resolveLocale,
		setLocaleByCode,
	} as unknown as I18nHelper;

	return instance;
}

export const i18n = useI18nHelper().i18n;
export default i18n;
