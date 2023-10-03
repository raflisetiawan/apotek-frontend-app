import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    medicine: false,
  }),
  getters: {
    getMedicine: (state) => state.medicine,
  },
  actions: {
    setMedicineLoading(status: boolean) {
      this.medicine = status;
    },
  },
});
