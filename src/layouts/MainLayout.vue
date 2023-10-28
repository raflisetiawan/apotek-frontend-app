<template>
  <q-layout view="hHh lpR fFf">
    <q-toolbar class="q-mt-md">
      <q-btn flat round size="lg" style="color: #22411F;" icon="fa-solid fa-list" class="q-mr-sm"
        @click="drawerLeft = !drawerLeft" />
    </q-toolbar>
    <q-drawer v-model="drawerLeft" show-if-above :width="200" :breakpoint="800" elevated
      style="background-color: #7AA748;" class="text-white">
      <q-scroll-area class="fit">
        <div class="q-pa-sm q-mt-md">
          <div class="row justify-around">
            <div class="q-col-4">
              <q-icon name="fa-solid fa-user" size="md"></q-icon>
            </div>
            <div class="q-col-6 q-mt-sm">
              <div class="text-body1">{{ getUser.name }}</div>
            </div>
          </div>
          <div class="row justify-center" style="margin-top: 100px;">
            <div class="col-8">
              <q-btn @click="handleLogout" size="md" class="full-width" rounded style="background-color: #22411F;">Sign
                Out</q-btn>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-white text-black">
      <q-toolbar class="justify-around">
        <q-btn icon="fa-solid fa-house" flat :to="{ name: 'HomePage' }" style="color: #22411F;"></q-btn>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useUserStore } from 'stores/user';
import { useQuasar } from 'quasar';

const { getUser, logout } = useUserStore();
const drawerLeft = ref(false);
const { dialog } = useQuasar();

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
