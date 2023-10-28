<template>
  <div class="q-pa-md container flex">
    <div class="text-h6 justify-start text-white">Import Dataset</div>
    <div class="row full-width justify-center">
      <div class="col-10">
        <div class="text-body1 text-center text-white">Input File</div>
        <q-file bg-color="white" outlined v-model="formFile" label="Choose file" bottom-slots counter
          accept=".xls,.xlsx, .csv" :filter="checkFileType" @update:model-value="onUpdateModel" @rejected="onRejected"
          use-chips>
          <template v-slot:prepend>
            <q-icon color="primary" name="attach_file" />
          </template>
          <template v-slot:hint v-if="!isFileUpload">
            <div class="text-white">No File Choosen</div>
          </template>
        </q-file>

        <q-page-sticky position="bottom" :offset="[8, 50]" v-if="isFileUpload">
          <q-btn rounded size="lg" class="full-width" color="primary" @click="handleImport">Import</q-btn>
        </q-page-sticky>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar, QRejectedEntry } from 'quasar';
import readXlsxFile from 'read-excel-file';
import { useTransactionStore } from 'stores/transaction';
import { useRouter } from 'vue-router';
import { csv2json } from 'json-2-csv';

const { push: routerPush } = useRouter();

const { notify } = useQuasar();

const formFile = ref();

const isFileUpload = ref(false);

const onUpdateModel = () => {
  if (!formFile.value) return isFileUpload.value = false;
  isFileUpload.value = true;

}

const checkFileType: ((files: readonly any[] | FileList) => readonly any[]) = (files) => {
  const filterFunction = (file: File) =>
    file.type ===
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.type === 'application/vnd.ms-excel' || file.type === 'text/csv';

  return Array.from(files).filter(filterFunction);
};

const onRejected = (rejectedEntries: QRejectedEntry[]) => {
  notify({
    position: 'top-right',
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`
  })
}

const schema = {
  'Id_transaksi': {
    prop: 'idTransaksi',
    type: Number,
    required: true
  },
  'Tanggal': {
    prop: 'tanggal',
    type: Date,
    dateFormat: 'mm/dd/yyyy'
  },
  'Nama': {
    prop: 'nama',
    type: String
  },
  'Harga': {
    prop: 'harga',
    type: String
  },
}

const { setTransaction } = useTransactionStore();
const handleImport = async () => {
  if (formFile.value.type === 'text/csv') {
    // Membaca file CSV menjadi string
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const csvString = event.target.result;


      // Menggunakan csvtojson untuk mengonversi CSV ke JSON
      let csv2jsonCallback = void function (err: any, json: any) {
        if (err) throw err;
        console.log(typeof json);
        console.log(json.length);
        console.log(json);
      }

      csv2json(csvString, csv2jsonCallback).then((data: any) => {
        const dataTransaksiTransformed = data.map((item: any) => ({
          idTransaksi: item.Id_transaksi,
          tanggal: item.Tanggal.toLowerCase(),
          nama: item.Nama.toLowerCase(),
          harga: item.Harga.toLowerCase(),
        }));
        setTransaction(dataTransaksiTransformed)
        routerPush({ name: 'TransactionPage' })

      });
    };
    reader.readAsText(formFile.value);
  } else {
    readXlsxFile(formFile.value, { schema }).then(({ rows, errors }) => {
      errors.length === 0
      setTransaction(rows);
      routerPush({ name: 'TransactionPage' })
    })

  }

}
</script>

<style scoped>
.container {
  height: 90vh;
}
</style>
