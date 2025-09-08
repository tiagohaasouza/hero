import { Router } from 'vue-router';
import { useRouter } from 'vue-router/auto';
import app from '@app';

const ENHANCER_KEY = Symbol('router-enhancer-installed');

export type Params = Record<string, unknown>;

const stringify = (value: unknown): string =>
        typeof value === 'object' ? JSON.stringify(value) : String(value);

export function useRouterEnhancer(r?: Router) {
        const router = r ?? useRouter();

        if (!(router as any)[ENHANCER_KEY]) {
                (router as any)[ENHANCER_KEY] = true;
                router.beforeEach((to, from, next) => {
                        if (to.path === from.path && to.hash !== from.hash) next();
                        else {
                                app.layout.showPageLoading();
                                next();
                        }
                });
        }

        const serializeParams = (
                params?: Params,
        ): Record<string, string | string[]> => {
                if (!params) return {};
                const query: Record<string, string | string[]> = {};
                Object.keys(params).forEach((key) => {
                        const value = params[key];
                        if (value === undefined || value === null) return;
                        if (Array.isArray(value)) query[key] = value.map(stringify);
                        else query[key] = stringify(value);
                });
                return query;
        };

        const push = (path: string, params?: Params) =>
                router.push({ path, query: serializeParams(params) });

        const replace = (path: string, params?: Params) =>
                router.replace({ path, query: serializeParams(params) });

        const back = () => router.back();

        return { push, replace, back, serializeParams };
}

export default useRouterEnhancer;
