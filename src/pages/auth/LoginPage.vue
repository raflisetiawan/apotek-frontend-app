<template>
  <div class="container text-center q-pa-md">
    <div class="row justify-center">
      <div class="col-12">
        <h3>Apriori</h3>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-md-7 col-sm-10 col-xs-11">
        <q-banner inline-actions :class="loginError.isError ? `text-white bg-red` : `text-white bg-red hidden `" rounded
          v-if="loginError.isError">
          {{ loginError.message }}
          <template v-slot:action>
            <q-btn flat dense icon="fa-solid fa-xmark" @click="loginError.isError = false" />
          </template>
        </q-banner>
        <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
          <q-input v-model="loginForm.email" label="Email *" lazy-rules type="email" :error="v$.email.$error"
            :error-message="v$.email.$errors.map((e) => e.$message).join()" @input="v$.email.$touch"
            @blur="v$.email.$touch" />

          <q-input type="password" v-model="loginForm.password" label="Password *" :error="v$.password.$error"
            :error-message="v$.password.$errors.map((e) => e.$message).join()" @input="v$.password.$touch"
            @blur="v$.password.$touch" />

          <div>
            <q-btn label="Login" type="submit" color="primary" :loading="loadingLogin" />
          </div>
          <div class="q-mt-md">
            <div class="text-caption">Belum punya akun? <q-btn flat color="blue" :to="{ name: 'RegisterPage' }" dense
                size="sm">
                Daftar</q-btn>
            </div>
          </div>
        </q-form>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { api } from 'src/boot/axios';
import { LoginError, LoginForm } from 'src/models/auth';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
const { cookies: qCookies } = useQuasar();

const router = useRouter();

const loginForm = reactive<LoginForm>({
  email: '',
  password: ''
})

const loginError = reactive<LoginError>({
  isError: false,
  message: ''
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(5) }
}

const v$ = useVuelidate(rules, loginForm)
const loadingLogin = ref(false);

const onSubmit = async (): Promise<void> => {
  if (!v$.value.$invalid) {
    loadingLogin.value = true;
    try {
      const response = await api.post('login', {
        email: loginForm.email,
        password: loginForm.password
      }, {
        headers: {
          Accept: 'application/json',
        }
      })
      qCookies.set('signedIn', 'true', {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Cookie berlaku selama 7 hari
        secure: true, // Cookie hanya berlaku di mode HTTPS
        sameSite: 'Strict',
      });
      qCookies.set('token', response.data.token, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Cookie berlaku selama 7 hari
        secure: true, // Cookie hanya berlaku di mode HTTPS
        sameSite: 'Strict',
      });


      router.push({ name: 'HomePage' })

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          loginError.isError = true;
          loginError.message = 'Password yang Anda masukkan salah.';
          throw new Error('Password yang Anda masukkan salah.');
        } else if (error.response.status === 404) {
          loginError.isError = true;
          loginError.message = error.response.data.message;
          throw new Error('Password yang Anda masukkan salah.');
        } else if (Array.isArray(error.response.data.message)) {
          error.response.data.message.forEach((errorMessage: string) => {
            loginError.isError = true;
            loginError.message = errorMessage;
          });
          throw new Error(error.response.data.message.join(', '));
        } else if (error.response.status === 500) {
          loginError.isError = true;
          loginError.message = 'Terjadi masalah pada server. Silakan hubungi administrator.';
          throw new Error('Terjadi masalah pada server. Silakan hubungi administrator.');
        } else {
          loginError.isError = true;
          loginError.message = 'Terjadi kesalahan saat proses autentikasi. Silakan coba lagi nanti.';
          throw new Error('Terjadi kesalahan saat proses autentikasi. Silakan coba lagi nanti.');
        }
      }
    } finally {
      loadingLogin.value = false;
    }
  } else {
    v$.value.$touch();
  }

}



</script>
