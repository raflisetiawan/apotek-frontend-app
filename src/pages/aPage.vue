<template>
  <div id="getstarted">
    <q-layout>
      <q-page-container>
        <q-page>
          <div class="container justify-center text-center">
            <div class="row justify-center q-mt-lg">
              <div class="col-6 q-col-xs-10">
                <q-img src="../assets/2efdb2e9-2322-478a-8120-635247d930cc.png" width="100px" />
              </div>
            </div>
            <div class="text-h4 text-weight-bold apotek-green">
              APOTEK
            </div>
            <div class="text-h4 text-weight-bold golong-color mb">
              GOLONG
            </div>
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
              <q-btn fab style="background: #22411F;" text-color="white" @click="handleGetStarted"
                class="getstarted-text">Get
                Started</q-btn>
            </q-page-sticky>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
const { cookies: qCookies } = useQuasar();

const router = useRouter();
const handleGetStarted = () => {
  qCookies.set('isFirstTime', 'false', {
    expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Cookie berlaku selama 7 hari
    secure: true, // Cookie hanya berlaku di mode HTTPS
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

.getstarted-text {
  top: 290px;
}
</style>
