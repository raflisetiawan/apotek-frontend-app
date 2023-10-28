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
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/transaction',
    component: () => import('layouts/TransactionLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/transactions/IndexPage.vue'),
        name: 'TransactionPage',
      },
      {
        path: 'upload',
        component: () => import('pages/transactions/ImportTransactionPage.vue'),
        name: 'ImportTransactionPage',
      },

      {
        path: 'oneitemset',
        component: () => import('pages/calculations/OneItemSetsPage.vue'),
        name: 'OneItemSetsPage',
      },
      {
        path: 'oneitemsetwithminimumsupport',
        component: () =>
          import('pages/calculations/OneItemSetsWithMinimumSupportPage.vue'),
        name: 'OneItemSetsWithMinimumSupportPage',
      },
      {
        path: 'twoitemset',
        component: () => import('pages/calculations/TwoItemSetsPage.vue'),
        name: 'TwoItemSetsPage',
      },
      {
        path: 'associationrules',
        component: () => import('pages/calculations/AssociationRulePage.vue'),
        name: 'AssociationRulePage',
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/getstarted',
    component: () => import('pages/GetstartedPage.vue'),
    name: 'GetStartedPage',
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
