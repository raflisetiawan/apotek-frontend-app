import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useUserStore } from 'src/stores/user';
import { useUser } from 'src/composables/auth/user';
import { Cookies } from 'quasar';

// Define the router instance outside of the route function
const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === 'history'
  ? createWebHistory
  : createWebHashHistory;

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createHistory(process.env.VUE_ROUTER_BASE),
});

// Use the router instance in the route function
export default route(function ({ ssrContext }) {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  const { $state, setUser } = useUserStore();

  const isFirstTime = (): boolean => {
    const data = cookies.get('isFirstTime');
    return !!data;
  };

  const isAuthenticated = (): boolean => {
    const token = cookies.get('token');
    return !!token;
  };

  Router.beforeEach(async (to, from, next) => {
    if ($state.id === 0) {
      if (cookies.get('token')) {
        try {
          const response = await useUser(Cookies.get('token'));

          setUser(response.data);
        } catch (error) {}
      }
    }

    if (!isFirstTime()) {
      if (to.name !== 'GetStartedPage') {
        next({ name: 'GetStartedPage' });
      } else {
        next();
      }
    } else if (to.meta.requiresAuth && !isAuthenticated()) {
      if (to.name !== 'login') {
        next({ name: 'LoginPage' });
      } else {
        next();
      }
    } else if (to.meta.requiresGuest && isAuthenticated()) {
      next('/');
    } else {
      next();
    }
  });

  return Router;
});

export { Router };
