<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered elevated class="bg-white text-black">
      <q-toolbar class="justify-around">
        <q-btn icon="fa-solid fa-house" flat :to="{ name: 'HomePage' }"></q-btn>
        <q-btn icon="fa-solid fa-table" flat></q-btn>
        <q-btn icon="fa-solid fa-user" flat :to="{ name: 'ProfilePage' }"></q-btn>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>
