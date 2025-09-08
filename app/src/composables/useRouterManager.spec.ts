import { describe, it, expect, vi } from 'vitest';
import { createMemoryHistory } from 'vue-router';
import useRouterManager from './useRouterManager';

describe('useRouterManager', () => {
  it('registers routes', async () => {
    const manager = useRouterManager({ history: createMemoryHistory() });
    manager.addRoutes([{ path: '/', name: 'home', component: { template: '<div>home</div>' } }]);
    expect(manager.router.getRoutes().some((r) => r.name === 'home')).toBe(true);
  });

  it('runs global guards', async () => {
    const manager = useRouterManager({ history: createMemoryHistory() });
    const guard = vi.fn((_to, _from, next) => next());
    manager.beforeEach(guard);
    manager.addRoutes([{ path: '/', name: 'home', component: { template: '<div>home</div>' } }]);
    await manager.router.push('/');
    expect(guard).toHaveBeenCalled();
  });
});
