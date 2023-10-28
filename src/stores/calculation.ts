import { defineStore } from 'pinia';
import { Itemset } from 'src/models/transaction';
import { AssociationRulesItems } from 'src/models/transaction';
export const useCalculationStore = defineStore('calculation', {
  state: () => ({
    oneItemSet: [] as any,
    transactions: [] as any,
    uniqueMedicines: [] as any,
    itemsWithSupport: [] as Itemset[],
    oneItemSetWithSupport: [] as Itemset[],
    twoItemSetWithSupport: [] as Itemset[],
    associationRulesItems: [] as AssociationRulesItems[],
  }),
  getters: {
    getOneItemSet: (state) => state.oneItemSet,
    getItemsWithSupport: (state) => state.itemsWithSupport,
    getTransactionPerDate: (state) => {
      // Membuat objek yang akan menyimpan data transaksi per tanggal
      const transactionsByDate: Record<string, string[]> = {};

      // Kelompokkan transaksi berdasarkan tanggal
      state.transactions.forEach((transaction: any) => {
        const date = new Date(transaction.tanggal).toDateString();
        if (!transactionsByDate[date]) {
          transactionsByDate[date] = [];
        }
        transactionsByDate[date].push(transaction.nama);
      });

      // Ubah objek menjadi array tanpa tanggal
      const result: string[][] = Object.values(transactionsByDate);

      return result;
    },
    getAssociationRulesItems: (state) => state.associationRulesItems,
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

    setItemsWithSupport(items: Itemset[]) {
      this.itemsWithSupport = items;

      // Membuat objek baru untuk item dengan panjang 1
      const itemsLength1 = this.itemsWithSupport.filter(
        (item) => item.items.length === 1
      );
      this.oneItemSetWithSupport = itemsLength1;

      // Membuat objek baru untuk item dengan panjang 2
      const itemsLength2 = this.itemsWithSupport.filter(
        (item) => item.items.length === 2
      );
      this.twoItemSetWithSupport = itemsLength2;

      // Sekarang Anda memiliki dua objek baru: itemsLength1 dan itemsLength2
      // itemsLength1 berisi item dengan panjang 1
      // itemsLength2 berisi item dengan panjang 2
    },
    setAssociationRulesItems(items: AssociationRulesItems[]) {
      this.associationRulesItems = items;
    },
  },
});
