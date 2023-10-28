<template>
  <q-layout>
    <div class="text-body1 text-white" style="margin-left: 79px;">
      Hasil perhitungan 1 itemset
    </div>
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
    <q-btn :loading="loadingSubmit" @click="handleCalculate" label="Minimum Support" fab
      style="background-color: #7AA748;" class="text-white" />
  </q-page-sticky>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCalculationStore } from 'stores/calculation';
import { useDateMonthYear } from 'src/composables/dates';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useTitleStore } from 'src/stores/title';
import { api } from 'boot/axios'
const { setTitle } = useTitleStore();
onMounted(() => setTitle('Perhitungan Apriori'))
const router = useRouter();

const { cookies: qCookies } = useQuasar();

// Data tabel
const { getOneItemSet, getTransactionPerDate, /*transactions ,*/ setItemsWithSupport } = useCalculationStore();

// Mengambil tanggal dari objek sebagai array kunci
const dates = Object.keys(getOneItemSet);

const loadingSubmit = ref(false);
// Mengambil nama obat unik
const uniqueMedicines = dates.length > 0 ? Object.keys(getOneItemSet[dates[0]]) : [];
const handleCalculate = async () => {
  loadingSubmit.value = true;
  // console.log(getTransactionPerDate);


  // const response = await axios.post('http://localhost:9100/api/apriori', { transactions: getTransactionPerDate }, {
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   }
  // })

  // setItemsWithSupport(response.data.frequentItemsets)

  try {
    const response = await api.post('frequent/calculate-frequent', { transactions: getTransactionPerDate }, {

      headers: {
        Authorization: `Bearer ${qCookies.get('token')}`
      }
    })
    setItemsWithSupport(response.data.frequentItemsets.itemsets)
    router.push({ name: 'OneItemSetsWithMinimumSupportPage' })

  } catch (error) {
    throw error;
  } finally {
    loadingSubmit.value = false;
  }
}
</script>

<style scoped></style>
