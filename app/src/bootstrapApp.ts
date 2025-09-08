import useRouterManager from '@/composables/useRouterManager';
import useAuthGuard from '@/composables/useAuthGuard';
import usePermissionGuard from '@/composables/usePermissionGuard';
import { useI18nHelper, type I18nHelper } from '@/composables/useI18nHelper';
import type { Router } from 'vue-router';

export interface AppContext {
  i18n: I18nHelper;
  router: Router;
  layout: { showPageLoading: () => void };
}

export async function bootstrapApp(): Promise<AppContext> {
  const i18n = useI18nHelper();
  await i18n.enableLocales(['en', 'pt-br', 'es']);
  i18n.additionalI18NFiles(['book']);
  await i18n.resolveLocale();

  const manager = useRouterManager();
  manager.addRoutes([
    { path: '/', name: 'home', component: () => import('@pages/HomePage.vue') },
    { path: '/books/:id?', name: 'books', component: () => import('@pages/BooksPage.vue') },
    { path: '/charts/apex-charts', name: 'chart.apex', component: () => import('@pages/ApexChartsPage.vue') },
    { path: '/charts/chart-js', name: 'chart.js', component: () => import('@pages/ChartJSPage.vue') },
    { path: '/login', name: 'login', component: () => import('@pages/LoginPage.vue') },
    { path: '/logout', name: 'logout', component: () => import('@pages/LoginPage.vue') },
    { path: '/register', name: 'register', component: () => import('@pages/RegistrationPage.vue') },
    { path: '/forgot-password', name: 'forgot-password', component: () => import('@pages/ForgotPasswordPage.vue') },
    { path: '/reset-password', name: 'reset-password', component: () => import('@pages/ResetPasswordPage.vue') },
    { path: '/confirm-code', name: 'confirm-code', component: () => import('@pages/ConfirmCodePage.vue') },
    { path: '/lock-screen', name: 'lock-screen', component: () => import('@pages/LockScreenPage.vue') },
    { path: '/verify-sms', name: 'verify-sms', component: () => import('@pages/VerifySMSPage.vue') },
    { path: '/verify-email', name: 'verify-email', component: () => import('@pages/VerifyEmailPage.vue') },
    { path: '/verify-authenticator', name: 'verify-authenticator', component: () => import('@pages/VerifyAuthenticatorPage.vue') },
    { path: '/verify-account', name: 'verify-account', component: () => import('@pages/VerifyAccountPage.vue') },
    { path: '/chat-gpt', name: 'chat-gpt', component: () => import('@pages/ChatGPTPage.vue') },
    { path: '/super/backend-libraries', name: 'super.backendLibraries', component: () => import('@pages/Super/BackendLibrariesPage.vue') },
    { path: '/', name: 'admin.home', component: () => import('@pages/AdminHomePage.vue') },
  ]);
  manager.notFound();

  const router = manager.router;
  router.beforeEach(useAuthGuard());
  router.beforeEach(usePermissionGuard());

  const layout = { showPageLoading: () => void 0 };

  return { i18n, router, layout };
}

export default bootstrapApp;
