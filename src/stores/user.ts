import { defineStore } from 'pinia';
import { User } from 'src/models/user';
import { Router } from 'src/router/index';
import { useNotify } from 'src/composables/notification';
import { Cookies } from 'quasar';

export const useUserStore = defineStore('user', {
  state: (): User => ({
    email: '',
    id: 0,
    name: '',
    created_at: '',
  }),
  getters: {
    getUser: (state) => (state = state),
  },
  actions: {
    setUser(userData: User) {
      this.$state.id = userData.id;
      this.$state.name = userData.name;
      this.$state.email = userData.email;
      this.$state.created_at = userData.created_at;
    },
    resetUser() {
      this.$state.id = 0;
      this.$state.name = '';
      this.$state.email = '';
      this.$state.email_verified_at = null;
      this.$state.updated_at = null;
      this.$state.created_at = '';
    },
    async logout() {
      this.resetUser();
      Cookies.remove('token');
      Cookies.remove('signedIn');
      Cookies.remove('refreshToken');
      useNotify('Berhasil logout', 'green');
      Router.push({ name: 'LoginPage' });
    },
  },
});
