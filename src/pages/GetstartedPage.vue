<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div id="getstarted" style="overflow-y: hidden;">
          <div class="justify-center text-center">
            <div class="row justify-center q-mt-lg">
              <div class="col-6 q-col-xs-10">
                <q-img src="../assets/2efdb2e9-2322-478a-8120-635247d930cc.png" width="200px" />
              </div>
            </div>
            <div class="text-h4 text-weight-bold apotek-green">
              APOTEK
            </div>
            <div class="text-h4 text-weight-bold golong-color">
              GOLONG
            </div>
            <q-page-sticky position="bottom" :offset="[18, 40]">
              <q-btn fab style="background: #22411F;" size="xl" text-color="white" @click="handleGetStarted"
                class="getstarted-text full-width">Get
                Started</q-btn>
            </q-page-sticky>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
const { cookies: qCookies } = useQuasar();

const router = useRouter();
const handleGetStarted = () => {
  qCookies.set('isFirstTime', 'false', {
    expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Cookie berlaku selama 7 hari
    // secure: true, // Cookie hanya berlaku di mode HTTPS
    sameSite: 'Strict',
  });

  router.push('/')
}
</script>

<style scoped>
.apotek-green {
  color: #22411F;
}

.golong-color {
  color: #F5C06A;
}

.getstarted-button {
  color: #22411F;
}
</style>
