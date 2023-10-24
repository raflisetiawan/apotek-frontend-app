<template>
  <q-layout>
    <q-header reveal elevated>
      <q-toolbar>
        <q-toolbar-title>Hasil support 2 itemset</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="q-pa-md">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Items</th>
              <th class="text-center">Supports</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td class="text-left">{{ item.items.join(', ') }}</td>
              <td class="text-center">{{ item.support }} %</td>
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
import axios from 'axios';
import { useCalculationStore } from 'stores/calculation';

// Data tabel
const { twoItemSetWithSupport: items, getTransactionPerDate: transactions } = useCalculationStore();

const handleCalculate = async () => {
  const response = await axios.post('http://localhost:9100/api/analyze', { transactions })
  console.log(response);


}


</script>

