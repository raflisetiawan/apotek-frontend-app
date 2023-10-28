<template>
  <div class="q-pa-md">
    <div class="text-h5 q-mb-lg text-weight-bold" style="color: #5A5959;">Hello Welcome...</div>
    <div class="row justify-center">
      <div class="col-md-8 col-sm-8 col-xs-12">
        <q-card style="border-radius: 17px;" class="my-card" id="apotek-golong-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="col-5 flex flex-center">
              <q-img class="rounded-borders" src="../assets/apotekhp.png" />
            </q-card-section>
            <q-card-section class="flex items-center">
              <div class="text-h6 items-center" id="apotek-golong-text">
                APOTEK GOLONG
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-8 q-mt-lg">
        <q-btn class="q-mb-lg full-width text-white q-py-md " rounded size="lg" style="background-color: #22411F;"
          :to="{ name: 'TransactionPage' }">Data
          Transaksi</q-btn>
        <q-btn class="q-mb-lg full-width text-white q-py-md " rounded size="lg" style="background-color: #22411F;"
          :to="{ name: 'ImportTransactionPage' }">Import
          Transaksi</q-btn>
        <q-btn class="q-mb-lg full-width text-white q-py-md " @click="handleLogout" rounded size="lg"
          style="background-color: #22411F;">
          Keluar</q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'stores/user';
import { useQuasar } from 'quasar';

const { dialog } = useQuasar();

const { logout } = useUserStore();

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

<style scoped>
#apotek-golong-text {
  color: #F5C06A;
}

#apotek-golong-card {
  background-color: #22411F;
}
</style>
