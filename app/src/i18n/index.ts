/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import app, { i18n as appI18n, router as appRouter } from '@app';
import {
	NavigationGuardNext,
	RouteLocationNormalizedGeneric,
	RouteLocationNormalizedLoadedGeneric,
	Router,
} from 'vue-router';

const i18n = appI18n.i18n;
const router: Router = appRouter.router;

router.beforeEach(
	(
		to: RouteLocationNormalizedGeneric,
		from: RouteLocationNormalizedLoadedGeneric,
		next: NavigationGuardNext,
	): void => {
		// console.log(`Navigating from: ${from.fullPath} to: ${to.fullPath}`);
		if (to.path === from.path && to.hash !== from.hash) next();
		else {
			app.layout.showPageLoading();
			next();
		}
	},
);

export default i18n;
