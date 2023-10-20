import { defineStore } from 'pinia';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [] as object[],
  }),
  getters: {
    getTransaction: (state) => state.transactions,
  },
  actions: {
    setTransaction(data: object[]) {
      this.transactions = data;
    },
  },
});
