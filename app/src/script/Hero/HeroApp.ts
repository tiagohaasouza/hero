/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import App from '@script/Logos/Vue/App/App';
import AuthenticationGuard from '@script/Logos/Vue/App/Router/Guard/AuthenticationGuard';
import AppData from '@script/Logos/Vue/App/Data/AppData';
import AppI18N from '@script/Logos/Vue/App/Data/I18N/AppI18N';
/**
 * HeroApp class extends the functionality of the App class to build a single-page application
 * with routing, layout, and internationalization capabilities.
 */
export default class HeroApp extends App {
	/**
	 * A singleton instance of the HeroApp class which could be either a HeroApp object or null.
	 * This instance is used to ensure that only one instance of HeroApp exists throughout the application.
	 * It helps in providing a central point of access to the HeroApp instance.
	 *
	 * @type {HeroApp | null}
	 */
	static #instance: HeroApp | null = null;
	/**
	 * Indicates whether an entity has been created.
	 *
	 * This boolean flag is used to check the creation status of an entity.
	 * If true, the entity has been successfully created.
	 * If false, the entity has not been created yet.
	 *
	 * @type {boolean}
	 */
	#created: boolean = false;

	/**
	 * Protected constructor for the class.
	 *
	 * This constructor should only be called within the class itself or by subclasses.
	 * It initializes the parent constructor via `super()`.
	 *
	 */
	protected constructor() {
		super();
	}

	/**
	 * Initializes and sets up the necessary components such as router, layout,
	 * and internationalization. This method should be called once to fully
	 * prepare the instance for operational use.
	 *
	 * @return {Promise<this>} A promise that resolves with the current instance
	 *                         after all components have been successfully created.
	 */
	async create(): Promise<this> {
		if (this.#created) return this;
		this.#created = true;

		await this.createI18n();
		await this.createRouter();
		await this.createLayout();

		return this;
	}

	/**
	 * Initializes and configures the router with predefined routes and guards.
	 *
	 * @return {Promise<this>} A promise that resolves to the current instance.
	 */
	protected async createRouter(): Promise<this> {
		const appRouterData = AppData.getInstance().router;

		//all
		appRouterData.add(
			[
				{
					path: '/',
					name: 'home',
					component: () => import('@pages/HomePage.vue'),
					meta: { authentication: true },
				},
				{
					path: '/books/:id?',
					name: 'books',
					component: () => import('@pages/BooksPage.vue'),
					meta: { authentication: true },
				},
				{
					path: '/charts/apex-charts',
					name: 'chart.apex',
					component: () => import('@pages/ApexChartsPage.vue'),
				},
				{
					path: '/charts/chart-js',
					name: 'chart.js',
					component: () => import('@pages/ChartJSPage.vue'),
				},
				{ path: '/login', name: 'login', component: () => import('@pages/LoginPage.vue') },
				{ path: '/logout', name: 'logout', component: () => import('@pages/LoginPage.vue') },
				{
					path: '/register',
					name: 'register',
					component: () => import('@pages/RegistrationPage.vue'),
				},
				{
					path: '/forgot-password',
					name: 'forgot-password',
					component: () => import('@pages/ForgotPasswordPage.vue'),
				},
				{
					path: '/reset-password',
					name: 'reset-password',
					component: () => import('@pages/ResetPasswordPage.vue'),
				},
				{
					path: '/confirm-code',
					name: 'confirm-code',
					component: () => import('@pages/ConfirmCodePage.vue'),
				},
				{
					path: '/lock-screen',
					name: 'lock-screen',
					component: () => import('@pages/LockScreenPage.vue'),
				},
				{
					path: '/verify-sms',
					name: 'verify-sms',
					component: () => import('@pages/VerifySMSPage.vue'),
				},
				{
					path: '/verify-email',
					name: 'verify-email',
					component: () => import('@pages/VerifyEmailPage.vue'),
				},
				{
					path: '/verify-authenticator',
					name: 'verify-authenticator',
					component: () => import('@pages/VerifyAuthenticatorPage.vue'),
				},
				{
					path: '/verify-account',
					name: 'verify-account',
					component: () => import('@pages/VerifyAccountPage.vue'),
				},
				{ path: '/chat-gpt', name: 'chat-gpt', component: () => import('@pages/ChatGPTPage.vue') },
			],
			{},
		);

		//super
		appRouterData.add(
			[
				{
					path: '/super/backend-libraries',
					name: 'super.backendLibraries',
					component: () => import('@pages/Super/BackendLibrariesPage.vue'),
				},
			],
			{
				guards: [AuthenticationGuard],
			},
		);

		//admin
		appRouterData.add(
			[{ path: '/', name: 'admin.home', component: () => import('@pages/AdminHomePage.vue') }],
			{
				guards: [AuthenticationGuard],
			},
		);

		appRouterData.notFound();

		return this;
	}

	/**
	 * Initializes the internationalization (i18n) settings by enabling a list of locales
	 * and setting a default loadLocale with specific country and timezone.
	 *
	 * @return {Promise<this>} A promise that resolves with the current instance once the i18n settings are applied.
	 */
	protected async createI18n(): Promise<this> {
		const appI18NData = AppData.getInstance().i18n;

		appI18NData.enableLocales(['en', 'pt-br', 'es']);

		AppI18N.additionalI18NFiles(['book']);

		await appI18NData.resolveLocale();
		//await appI18NData.setLocaleByCode('pt-br');

		return this;
	}

	/**
	 * Asynchronously creates and initializes the layout.
	 *
	 * @return {Promise<this>} A promise that resolves to the current instance after the layout has been created.
	 */
	protected async createLayout(): Promise<this> {
		return this;
	}

	/**
	 * Retrieves the singleton instance of the HeroApp class. If the instance does not
	 * already exist, it creates one asynchronously.
	 *
	 * @return {Promise<HeroApp>} A promise resolving to the single instance of HeroApp.
	 */
	public static async getInstance(): Promise<HeroApp> {
		if (!this.#instance) this.#instance = await new HeroApp().create();
		return this.#instance;
	}
}
