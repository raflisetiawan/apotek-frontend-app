<template>
  <q-layout>
    <div class="text-body1 text-white" style="margin-left: 79px;">
      Hasil perhitungan 2 itemset
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
              <td class="text-left">{{ item.items.join(', ') }}</td>
              <td class="text-center">{{ item.support }} </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-page-container>
  </q-layout>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn @click="handleCalculate" label="Aturan Asosiasi" fab style="background-color: #7AA748;" class="text-white" />
  </q-page-sticky>
</template>


<script setup lang="ts">
import { api } from 'boot/axios';
import { onMounted, ref } from 'vue';
import { useCalculationStore } from 'stores/calculation';
import { useRouter } from 'vue-router';
import { useTitleStore } from 'src/stores/title';
const { setTitle } = useTitleStore();
onMounted(() => setTitle('Perhitungan Apriori'))
const router = useRouter();
const loadingSubmit = ref(false);


// Data tabel
const { twoItemSetWithSupport: items, getTransactionPerDate: transactions, setAssociationRulesItems } = useCalculationStore();

const handleCalculate = async () => {
  loadingSubmit.value = true;
  try {
    const response = await api.post('apriori/calculate-apriori', { transactions }, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    setAssociationRulesItems(response.data.associationRules.result);

  } catch (error) {
    throw error
  } finally {
    loadingSubmit.value = false
  }

  router.push({ name: 'AssociationRulePage' });
}


</script>

