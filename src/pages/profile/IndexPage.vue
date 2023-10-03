<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <q-avatar size="xl">
        <q-icon class="fa-solid fa-user" size="xl"></q-icon>
      </q-avatar>
    </div>
    <div class="row q-mt-md">
      <div class="col-12">
        <div class="text-subtitle2 text-center">Email: {{ email }}</div>
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-12">
        <div class="text-subtitle2 text-center">Username: {{ name }}</div>
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-12">
        <div class="text-subtitle2 text-center text-grey">Dibuat: {{ formattedCreatedAt }}</div>
      </div>
    </div>
    <div class="row justify-center">
      <q-btn color="primary" label="Logout" @click="handleLogout()"></q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'stores/user';
import { useQuasar } from 'quasar';

const { logout, email, name, created_at } = useUserStore();
const { dialog } = useQuasar();

const parseISODate = (isoDateString: string): string => {
  return new Date(isoDateString).toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const formattedCreatedAt = parseISODate(created_at);

const handleLogout = () => {
  dialog({
    title: 'Konfirmasi Logout',
    message: 'Apakah anda ingin logout?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await logout()
  })
}
</script>

<style scoped></style>
