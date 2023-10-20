<template>
  <div class="q-pa-md">
    <q-table flat bordered title="Transaksi" :rows="rows" :columns="columns" row-key="idTransaksi" dense
      :visible-columns="visibleColumns" :selected-rows-label="getSelectedString" selection="multiple"
      v-model:selected="selected"
      @row-click="(event: Event, row: Transaction, index: number) => handleRowClick(event, row, index)">
      <template v-slot:top="props">
        <div class="col-2 q-table__title">Transaksi</div>
        <q-space />

        <div v-if="$q.screen.gt.xs" class="col">
          <q-toggle v-model="visibleColumns" val="nama" label="nama" />
          <q-toggle v-model="visibleColumns" val="harga" label="Harga" />
          <q-toggle v-model="visibleColumns" val="tanggal" label="Tanggal" />
        </div>
        <q-select v-else v-model="visibleColumns" multiple borderless dense options-dense
          :display-value="$q.lang.table.columns" emit-value map-options :options="columns" option-value="name"
          style="min-width: 150px" />

        <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen" class="q-ml-md" />
      </template>

    </q-table>
    <DialogChoice :isDialogChoice="isDialogChoice" @delete-choice="deleteRow"
      @updateChoice="isDialog = true; isDialogChoice = false;" @close-dialog-choice="isDialogChoice = false"
      :row="rowUpdateModel.row" />
    <DialogEdit @change-dialog="(data) => handleUpdateRow(data)" :isDialog="isDialog" :row="rowUpdateModel.row"
      :index="rowUpdateModel.index" />
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-btn size="lg" fab label="Save" color="primary" class="q-mr-md" @click="onSave"
        v-if="getTransaction.length > 0" />
      <q-btn fab label="Import" color="primary" :to="{ name: 'ImportTransactionPage' }" />
    </q-page-sticky>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QTableColumn } from 'quasar';
import { useTransactionStore } from 'stores/transaction';
import DialogEdit from 'src/components/transaction/DialogEdit.vue';
import { Transaction, TransactionUpdateProps } from 'src/models/transaction';
import DialogChoice from 'src/components/transaction/DialogChoice.vue';
import { useIsDdmmyy } from 'src/composables/dates';
import { useCalculationStore } from 'stores/calculation';
import { useRouter } from 'vue-router';
const router = useRouter();

const { getTransaction } = useTransactionStore();
const isDialog = ref(false);
const isDialogChoice = ref(false);
const { calculateOneItemSet } = useCalculationStore();
const columns = ref<QTableColumn[]>([
  {
    name: 'idTransaksi',
    required: true,
    label: 'ID TRANSAKSI',
    align: 'left',
    field: row => row.idTransaksi,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'nama',
    label: 'NAMA',
    align: 'left',
    field: row => row.nama,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'tanggal',
    label: 'TANGGAL',
    align: 'left',
    field: (row) => {
      const date = new Date(row.tanggal);
      return date.toLocaleDateString('id-ID');
    },
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'harga',
    label: 'HARGA',
    align: 'left',
    field: row => row.harga,
    format: val => `${val}`,
    sortable: true
  },
])

let rows = ref(getTransaction);

const visibleColumns = ref(['tanggal', 'nama', 'harga'])

const selected = ref([]);
const getSelectedString = () => {
  return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.value.length}`
}

const rowUpdateModel = ref({
  row: {} as Transaction,
  index: 0
});

const handleRowClick = (event: Event, row: Transaction, index: number) => {
  isDialogChoice.value = true;
  rowUpdateModel.value.row = row;
  rowUpdateModel.value.index = index;
}

const deleteRow = () => {
  isDialogChoice.value = false;
  const index = rows.value.findIndex((item: any) => item.idTransaksi === rowUpdateModel.value.row.idTransaksi);
  if (index !== -1) {
    rows.value.splice(index, 1);
    // Panggil fungsi untuk membersihkan item yang terpilih (jika ada)
    rows.value = rows.value.filter((selectedItem: any) => selectedItem !== rowUpdateModel.value.row.idTransaksi);
  }
}

const handleUpdateRow = (data: TransactionUpdateProps) => {
  isDialog.value = false;
  changeRowByIdTransaksi(data.data?.idTransaksi, data.data, rows.value)
}

function changeRowByIdTransaksi(idTransaksi: number, newData: Transaction, row: object[]) {
  const index = row.findIndex((item: any) => item.idTransaksi === idTransaksi);
  if (index !== -1) {
    if (!useIsDdmmyy(newData.tanggal)) {
      row[index] = { ...row[index], ...newData };
    } else {
      row[index] = { ...row[index], ...newData };
    }
  }
}

const onSave = () => {
  if (selected.value.length === 0) {
    calculateOneItemSet(rows.value);
    router.push({ name: 'OneItemSetsPage' })
  } else {
    console.log(selected.value);
  }

}
</script>
