import type {
        NavigationGuardNext,
        RouteLocationNormalized,
} from 'vue-router';
import { useUserStore } from '@stores/user';

export function usePermissionGuard() {
        return (
                to: RouteLocationNormalized,
                from: RouteLocationNormalized,
                next: NavigationGuardNext,
        ): void => {
                const userStore = useUserStore();
                const requiredRoles = to.meta?.roles as string[] | undefined;

                if (!requiredRoles || requiredRoles.includes(userStore.getRole))
                        next();
                else next({ name: 'not-found' });
        };
}

export default usePermissionGuard;
