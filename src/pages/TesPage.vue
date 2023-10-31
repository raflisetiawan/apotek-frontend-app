<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <q-form @submit="handleSub" enctype="multipart/form-data">
          <q-file v-model="model" label="Standard" />
          <q-btn type="submit">Submit</q-btn>
        </q-form>
      </div>
    </div>
    <div class="row col-md-10" v-if="columns.length !== 0">
      <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

const model = ref();
const columns = ref([]); // Kolom akan diisi sesuai respons
const rows = ref([]);    // Baris akan diisi sesuai respons
const columnFields = ref()

const handleSub = async () => {
  const response = await api.post('excel/upload', { excel: model.value }, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  });

  columnFields.value = Object.keys(response.data[0])
  const tempColumns: any = [];
  columnFields.value.forEach((columnField: string) => {
    tempColumns.push({
      name: columnField,
      required: true,
      label: columnField,
      align: 'left',
      field: columnField,
      sortable: true
    })
  });
  columns.value = tempColumns;
  console.log(response);

  rows.value = response.data
}
</script>

<style scoped></style>
