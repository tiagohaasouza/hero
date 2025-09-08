import app, { router as appRouter } from '@app';
import {
	NavigationGuardNext,
	RouteLocationNormalizedGeneric,
	RouteLocationNormalizedLoadedGeneric,
	Router,
} from 'vue-router';

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

export default router;
