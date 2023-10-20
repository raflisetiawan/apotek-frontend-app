<template>
  <div>
    <q-dialog persistent v-model="showDialog">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Ingin menghapus atau mengedit</span>
          <q-btn dense flat icon="close" v-close-popup @click="$emit('closeDialogChoice')">
            <q-tooltip>Close</q-tooltip>
          </q-btn>

        </q-card-section>

        <q-card-actions>
          <q-btn flat icon="delete" color="red" @click="isDialog = true" />
          <q-space />
          <q-btn flat icon="edit" color="primary" @click="$emit('updateChoice')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Yakin ingin menghapus transaksi {{ props.row.nama }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn label="Yakin" color="red" @click="$emit('deleteChoice')" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const isDialog = ref(false);

const props = defineProps(['isDialogChoice', 'row']);
defineEmits(['updateChoice', 'deleteChoice', 'closeDialogChoice']);
const showDialog = computed(() => props.isDialogChoice);
</script>

<style scoped></style>
