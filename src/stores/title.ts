import { defineStore } from 'pinia';

export const useTitleStore = defineStore('title', {
  state: () => ({
    name: '' as string,
  }),
  getters: {
    getTitle: (state) => state.name,
  },
  actions: {
    setTitle(name: string) {
      this.name = name;
    },
  },
});
