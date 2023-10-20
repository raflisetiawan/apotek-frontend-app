<template>
  <q-layout>
    <q-header reveal elevated>
      <q-toolbar>
        <div>Hasil perhitungan 2 itemset</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="q-pa-md">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Nama Itemset</th>
              <th class="text-right">Jumlah</th>
              <th class="text-right">Support</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(itemSet, index) in twoItemSets" :key="index">
              <td class="text-left">{{ itemSet.namaItemSet }}</td>
              <td class="text-right">{{ itemSet.jumlah }}</td>
              <td class="text-right">{{ itemSet.support }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-page-container>
  </q-layout>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn @click="handleCalculate" label="2 item sets" fab color="primary" />
  </q-page-sticky>
</template>

<script setup lang="ts">
import { useCalculationStore } from 'stores/calculation';
import { api } from 'src/boot/axios';



const handleCalculate = async () => {

}

</script>

<style scoped></style>
