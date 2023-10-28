<template>
  <div class="container text-center q-pa-md">
    <div class="row justify-center">
      <div class="col-12">
        <h3 class="text-white">Apriori</h3>
        <p class="text-text-body1 text-white">Create an account to get started</p>
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
          <q-input rounded outlined bg-color="white" v-model="registerForm.email" label="Email *" lazy-rules type="email"
            :error="v$.email.$error" :error-message="v$.email.$errors.map((e) => e.$message).join()"
            @input="v$.email.$touch" @blur="v$.email.$touch" />

          <q-input rounded outlined bg-color="white" v-model="registerForm.username" label="Username *" lazy-rules
            type="text" :error="v$.username.$error" :error-message="v$.username.$errors.map((e) => e.$message).join()"
            @input="v$.username.$touch" @blur="v$.username.$touch" />

          <q-input rounded outlined bg-color="white" type="password" v-model="registerForm.password" label="Password *"
            :error="v$.password.$error" :error-message="v$.password.$errors.map((e) => e.$message).join()"
            @input="v$.password.$touch" @blur="v$.password.$touch" />
          <q-input rounded outlined bg-color="white" type="password" v-model="registerForm.passwordConfirmation"
            label="Konfirmasi Password *" />
          <div class="row justify-start">
            <div class="q-mt-md">
              <q-checkbox v-model="accept" class="text-white" color="primary" label="I accept the terms of Use" />
            </div>
          </div>
          <div>

            <q-btn label="Sign Up" class="full-width text-white" rounded size="lg" type="submit"
              style="background-color: #7AA748;" :loading="loadingLogin" />
          </div>
          <div class="q-mt-md">
            <div class="text-caption text-white">Already have account? <q-btn flat color="blue"
                :to="{ name: 'LoginPage' }" dense size="sm">
                Sign In</q-btn>
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
import { useRequired, useMinLength, useEmail } from 'src/composables/validators'
import { api } from 'src/boot/axios';
import { LoginError, RegisterForm } from 'src/models/auth';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const accept = ref(false);

const registerForm = reactive<RegisterForm>({
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
})

const loginError = reactive<LoginError>({
  isError: false,
  message: ''
})

const rules = {
  username: { required: useRequired(), minLenght: useMinLength(2) },
  email: { required: useRequired(), email: useEmail() },
  password: { required: useRequired(), minLength: useMinLength(5), },
}

const v$ = useVuelidate(rules, registerForm)
const loadingLogin = ref(false);

const onSubmit = async (): Promise<void> => {
  if (registerForm.passwordConfirmation !== registerForm.password) {
    loginError.isError = true;
    loginError.message = 'Konfirmasi password tidak valid';
    return;
  }
  if (!v$.value.$invalid && accept.value) {
    loadingLogin.value = true;
    try {
      await api.post('auth/register', {
        email: registerForm.email,
        password: registerForm.password,
        name: registerForm.username
      }, {
        headers: {
          Accept: 'application/json',
        }
      })
      router.push({ name: 'LoginPage' })

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

<style scoped></style>
