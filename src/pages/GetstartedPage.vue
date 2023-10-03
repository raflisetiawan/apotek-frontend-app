<template>
  <div id="getstarted">
    <div class="container justify-center text-center">
      <div class="row justify-center q-mt-lg">
        <div class="col-6">
          <q-img src="../assets/2efdb2e9-2322-478a-8120-635247d930cc.png" />
        </div>
      </div>
      <div class="text-h4 text-weight-bold apotek-green">
        APOTEK
      </div>
      <div class="text-h4 text-weight-bold golong-color mb">
        GOLONG
      </div>
      <q-btn color="primary" @click="handleGetStarted" class="getstarted-text">Get Started</q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const handleGetStarted = () => {
  localStorage.setItem('isFirstTime', 'false');
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

.getstarted-text {
  top: 290px;
}
</style>
