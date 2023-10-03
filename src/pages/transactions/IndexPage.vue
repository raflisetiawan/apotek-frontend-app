<template>
  <div>
    <q-table title="Transaksi" :rows="rows" :columns="columns" row-key="medicines"
      no-data-label="Data Transaksi masih kosong" />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="isTransactionDialog = true" />
    </q-page-sticky>

    <q-dialog v-model="isTransactionDialog" full-height full-width>
      <q-card>
        <q-card-section>
          <div class="text-h6">Tambah Transaksi</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="transactionForm.name" label="Nama transaksi" lazy-rules
              :rules="[val => val && val.length > 0 || 'Harus di isi']" />

            <q-select :loading="medicineLoading" filled v-model="transactionForm.medicines" use-input input-debounce="0"
              @filter="filterFnCategory" use-chips behavior="dialog" :options="optionsMedicines" label="List Obat"
              multiple>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input v-model="transactionForm.price" label="Harga" lazy-rules
              :rules="[val => val && val.length > 0 || 'Harus di isi']" />
            <div>
              <q-btn label="Tambah" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { QTableColumn } from 'quasar';
import { useGetMedicines } from 'src/composables/medicines'
import { TransactionWithMedicines } from 'src/models/transaction';
import { useLoadingStore } from 'stores/loading';

const isTransactionDialog = ref(false);
const { getMedicine: medicineLoading } = useLoadingStore();

onMounted(async () => {
  await getMedicine();
})

const columns: QTableColumn[] = [
  {
    name: 'transaction',
    required: true,
    label: 'Transaksi',
    align: 'left',
    field: (row: { transactionId: string; }) => row.transactionId,
    format: (val: any) => `${val}`,
    sortable: true
  },
  {
    name: 'medicines',
    align: 'left',
    label: 'Obat',
    field: (row: { name: string[]; }) => row.name.join(', '), // Menggunakan join() untuk memisahkan dengan koma
    sortable: true
  },
]

const transactionForm = reactive<TransactionWithMedicines>({
  name: '',
  medicines: [],
  id: 0,
  price: 0,
})

const rows = ref([
  // {
  //   transactionId: 1,
  //   name: ['Chips', 'Soda'],
  // },
  // {
  //   transactionId: 2,
  //   name: ['Soda', 'Candy'],
  // },
  // {
  //   transactionId: 3,
  //   name: ['Chips', 'Soda', 'Candy'],
  // },
  // {
  //   transactionId: 4,
  //   name: ['Chips', 'Candy', 'Candy'],
  // },
  // {
  //   transactionId: 5,
  //   name: ['Chips', 'Soda',],
  // },
])


const medicines = ref();
const optionsMedicines = ref(medicines.value);
const getMedicine = async () => {
  const { data } = await useGetMedicines(localStorage.getItem('token'));
  medicines.value = data.map((medicine) => medicine.name);

}

const filterFnCategory = (val: string, update: (callback: () => void) => void) => {
  if (val === '') {
    update(() => {
      optionsMedicines.value = medicines.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsMedicines.value = medicines.value.filter(
      (medicine: any) => medicine.toLowerCase().indexOf(needle) > -1
    );
  });
};



const onSubmit = async () => {

}
</script>

<style scoped></style>
