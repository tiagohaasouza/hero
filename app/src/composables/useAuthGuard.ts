import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

/**
 * Provides a navigation guard that checks the authentication state before
 * allowing access to protected routes.
 *
 * Routes can be marked as public by setting `meta.requiresAuth` to `false`.
 * All other routes will be considered protected and will trigger a redirect
 * to the login page when the user is not authenticated.
 */
export function useAuthGuard() {
  return (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ): void => {
    const auth = useAuthStore();
    const requiresAuth = to.meta.requiresAuth !== false;

    if (requiresAuth && !auth.isAuthenticated) {
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  };
}

export default useAuthGuard;
