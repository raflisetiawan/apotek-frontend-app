<template>
  <div class="q-pa-md">
    <h4 class="text-grey">Hello Welcome!</h4>
    <div class="row justify-center">
      <div class="col-md-8 col-sm-8 col-xs-12">
        <q-card class="my-card" id="apotek-golong-card" flat bordered>
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
      <div class="col-4 q-mt-lg">
        <q-btn color="primary" class="q-mb-md" :to="{ name: 'TransactionPage' }">Data Transaksi</q-btn>
        <q-btn color="primary" class="q-mb-md">Data Transaksi</q-btn>
        <q-btn color="primary" class="q-mb-md">Data Transaksi</q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
#apotek-golong-text {
  color: #F5C06A;
}

#apotek-golong-card {
  background-color: #22411F;
}
</style>
