<template>
  <div>
    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit Transaksi</div>
        </q-card-section>

        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-card-section class="q-pt-none">
            <q-input v-model="formDialog.nama" autofocus label="Nama" />
            <q-input v-model="formDialog.harga" label="Harga" />
            <q-input filled v-model="formDialog.tanggal" mask="date" class="q-mt-md" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="formDialog.tanggal">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" class="q-mr-lg" @click="$emit('changeDialog', false)" />
            <q-btn type="submit" label="Edit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import { Transaction } from 'src/models/transaction';
import { useYearMonthDate } from 'src/composables/dates';

const props = defineProps<{ isDialog: boolean, row: Transaction, index: number }>()
const showDialog = computed(() => props.isDialog)
const emit = defineEmits(['changeDialog'])

const formDialog = ref({
  nama: '',
  harga: '',
  tanggal: '',
  idTransaksi: 0
});

const onSubmit = () => {
  emit('changeDialog', { data: formDialog.value, index: props.index });

}

watchEffect(() => {
  if (showDialog.value) {
    formDialog.value.idTransaksi = props.row.idTransaksi;
    formDialog.value.nama = props.row.nama
    formDialog.value.harga = props.row.harga
    formDialog.value.tanggal = useYearMonthDate(props.row);

  }
})

</script>

<style scoped></style>
