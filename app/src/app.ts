/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------
| Imports
------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { randomID, onDOMReady } from '@script/Logos/Util/dom';
import { sprintf, vsprintf } from 'sprintf-js';
import HeroApp from '@script/Hero/HeroApp';
import AppI18N from '@script/Logos/Vue/App/Data/I18N/AppI18N';
import AppRouter from '@script/Logos/Vue/App/Data/Router/AppRouter';
import AppLayout from '@script/Logos/Vue/App/Data/Layout/AppLayout';
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------
| Global error Handling
------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//const data:AppData = AppData.getInstance();
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------
| I18N
------------------------------------------------------------------------------------------------------------------------------------------------------------- */

/*
console.log('message.success', appI18NData.translate('message.success'));
console.log(appI18NData.date(new Date(), 'short'));
console.log(appI18NData.date(new Date(), 'long'));
console.log(appI18NData.dateTime(new Date(), 'short'));
console.log(appI18NData.dateTime(new Date(), 'long'));


console.log('message.success', appI18NData.translate('message.success'));
console.log(appI18NData.date(new Date(), 'short'));
console.log(appI18NData.date(new Date(), 'long'));
console.log(appI18NData.dateTime(new Date(), 'short'));
console.log(appI18NData.dateTime(new Date(), 'long'));
console.log(appI18NData.time(new Date(), 'short'));
console.log(appI18NData.time(new Date(), 'long'));
console.log(appI18NData.currency(1000.99));
console.log(appI18NData.number(1000.99));
*/

//appI18NData.toString();
//appRouterData.toString();
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------
| Config
------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/**
 * Defines the shape of the application instance returned by {@link HeroApp.getInstance}.
 * The instance merges the base {@link HeroApp} functionality with the
 * modules that are created during boot (i18n, router and layout).
 */
type HeroAppInstance = HeroApp & {
	i18n: AppI18N;
	router: AppRouter;
	layout: AppLayout;
};

const app = (await HeroApp.getInstance()) as HeroAppInstance;
/**
 * An instance of the AppData class, utilized to manage and interact with the data provided by the application.
 */
export const i18n: AppI18N = app.i18n;
/**
 * An instance of the AppData class, utilized to manage and interact with the data provided by the application.
 */
export const router: AppRouter = app.router;
/**
 * An instance of the AppData class, utilized to manage and interact with the data provided by the application.
 */
export const layout: AppLayout = app.layout;

export const socket: Record<string, never> = {};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------
| Exports
------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export { randomID, onDOMReady, sprintf, vsprintf };

export default app;
