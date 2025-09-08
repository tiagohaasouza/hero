import { createRouter, createWebHistory, type Router, type RouteRecordRaw, type RouterHistory, type NavigationGuard } from 'vue-router';
import type { Component } from 'vue';

export interface RouterManager {
  router: Router;
  addRoutes: (routes: RouteRecordRaw[], options?: { guards?: NavigationGuard[] }) => void;
  beforeEach: (guard: NavigationGuard) => void;
  notFound: (component?: Component) => void;
}

export default function useRouterManager(options: { history?: RouterHistory; routes?: RouteRecordRaw[] } = {}): RouterManager {
  const router = createRouter({
    history: options.history || createWebHistory(),
    routes: options.routes || [],
  });

  function addRoutes(routes: RouteRecordRaw[], opts: { guards?: NavigationGuard[] } = {}): void {
    routes.forEach((r) => router.addRoute(r));
    if (opts.guards) {
      for (const guard of opts.guards) {
        router.beforeEach(guard);
      }
    }
  }

  function beforeEach(guard: NavigationGuard): void {
    router.beforeEach(guard);
  }

  function notFound(component?: Component): void {
    router.addRoute({
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: component || { template: '<div>Not Found</div>' },
    });
  }

  return { router, addRoutes, beforeEach, notFound };
}
