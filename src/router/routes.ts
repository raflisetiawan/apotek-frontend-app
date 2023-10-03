import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'HomePage',
      },
      {
        path: '/transaction',
        component: () => import('pages/transactions/IndexPage.vue'),
        name: 'TransactionPage',
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/getstarted',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/GetstartedPage.vue'),
        name: 'GetStartedPage',
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    meta: { requiresGuest: true },
    children: [
      {
        path: '',
        component: () => import('pages/auth/LoginPage.vue'),
        name: 'LoginPage',
      },
    ],
  },
  {
    path: '/register',
    component: () => import('layouts/AuthLayout.vue'),
    meta: { requiresGuest: true },
    children: [
      {
        path: '',
        component: () => import('pages/auth/RegisterPage.vue'),
        name: 'RegisterPage',
      },
    ],
  },
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('pages/profile/IndexPage.vue'),
        name: 'ProfilePage',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
