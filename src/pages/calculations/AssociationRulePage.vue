<template>
  <q-layout>
    <div class="text-body1 text-white" style="margin-left: 79px;">
      Hasil Aturan Asosiasi
    </div>
    <q-page-container>
      <div class="q-pa-md">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-center">RHS</th>
              <th class="text-center">LHS</th>
              <th class="text-center">Confidence</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td class="text-center">{{ item.rhs.join('') }} </td>
              <td class="text-center">{{ item.lhs.join(', ') }}</td>
              <td class="text-center">{{ item.confidence * 100 + '%' }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-page-container>
  </q-layout>
</template>


<script setup lang="ts">
import { useCalculationStore } from 'stores/calculation';
import { onMounted } from 'vue';
import { useTitleStore } from 'src/stores/title';
const { setTitle } = useTitleStore();
onMounted(() => setTitle('Perhitungan Apriori'))

// Data tabel
const { getAssociationRulesItems: items } = useCalculationStore();



</script>

