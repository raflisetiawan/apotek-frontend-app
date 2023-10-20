import { defineStore } from 'pinia';
export const useCalculationStore = defineStore('calculation', {
  state: () => ({
    oneItemSet: [] as any,
    transactions: [] as any,
    uniqueMedicines: [] as any,
  }),
  getters: {
    getOneItemSet: (state) => state.oneItemSet,
  },
  actions: {
    setOneItemSet(data: any) {
      this.oneItemSet = data;
    },
    calculateOneItemSet(transactions: any) {
      this.transactions = transactions;
      // Mengumpulkan semua nama obat unik
      const uniqueMedicines = [
        ...new Set(transactions.map((transaction: any) => transaction.nama)),
      ];
      this.uniqueMedicines = uniqueMedicines;

      // Membuat objek untuk menyimpan jumlah obat yang dibeli pada setiap tanggal
      const medicineCountsByDate: Record<string, Record<string, number>> = {};

      // Mengisi objek medicineCountsByDate dengan nilai awal 0
      transactions.forEach((transaction: any) => {
        if (!medicineCountsByDate[transaction.tanggal]) {
          medicineCountsByDate[transaction.tanggal] = {};
          uniqueMedicines.forEach((medicine: any) => {
            medicineCountsByDate[transaction.tanggal][medicine] = 0;
          });
        }
      });

      // Menghitung jumlah obat yang dibeli pada setiap tanggal
      transactions.forEach((transaction: any) => {
        medicineCountsByDate[transaction.tanggal][transaction.nama]++;
      });

      // Membuat tabel
      const table: Record<string, Record<string, number>> = {};
      const dates = Object.keys(medicineCountsByDate);

      dates.forEach((date) => {
        table[date] = {};
        uniqueMedicines.forEach((medicine: any) => {
          table[date][medicine] = medicineCountsByDate[date][medicine] || 0;
        });
      });
      this.oneItemSet = table;
    },
  },
});
