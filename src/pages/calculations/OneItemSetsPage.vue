<template>
  <q-layout>
    <q-header reveal elevated>
      <q-toolbar>
        <q-toolbar-title>Hasil perhitungan 1 itemset</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="q-pa-md">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Tanggal</th>
              <th v-for="medicine in uniqueMedicines" :key="medicine" class="text-right">{{ medicine }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="date in dates" :key="date">
              <td class="text-left">{{ useDateMonthYear(date) }}</td>
              <td v-for="medicine in uniqueMedicines" :key="medicine" class="text-right">{{ getOneItemSet[date][medicine]
              }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-page-container>
  </q-layout>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn @click="handleCalculate" label="Minimum Support" fab color="primary" />
  </q-page-sticky>
</template>


<script setup lang="ts">
import { useCalculationStore } from 'stores/calculation';
import { useDateMonthYear } from 'src/composables/dates';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';

const { transactions } = useCalculationStore();
const router = useRouter();

// Data tabel
const { getOneItemSet } = useCalculationStore();

// Mengambil tanggal dari objek sebagai array kunci
const dates = Object.keys(getOneItemSet);

// Mengambil nama obat unik
const uniqueMedicines = dates.length > 0 ? Object.keys(getOneItemSet[dates[0]]) : [];
const handleCalculate = async () => {

  const response = await api.post('apriori/twoitemset', { transactions }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  console.log(response);

  // router.push({ name: 'OneItemSetsWithMinimumSupportPage' })
}
</script>

<style scoped></style>
