<template>
  <q-layout>
    <div class="text-body1 text-white" style="margin-left: 79px;">
      Itemset 1 yang memenuhi minimun support
    </div>
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
              <td class="text-left">{{ item.items[0] }}</td>
              <td class="text-center">{{ item.support }} %</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-page-container>
  </q-layout>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn @click="handleCalculate" label="2 Itemset" fab style="background-color: #7AA748;" class="text-white" />
  </q-page-sticky>
</template>


<script setup lang="ts">
import { useCalculationStore } from 'stores/calculation';
import { useRouter } from 'vue-router';
const router = useRouter();

// Data tabel
const { oneItemSetWithSupport: items } = useCalculationStore();

const handleCalculate = () => {
  router.push({ name: 'TwoItemSetsPage' })
}


</script>

