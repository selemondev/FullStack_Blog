<script setup>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import { useAuthStore } from './stores/authStore';
import { ref, watchEffect } from "vue";
const authStore = useAuthStore();
const token = ref("");
watchEffect(() => {
  token.value = authStore.user;
});
</script>
<template>
<main>
  <Navbar/>
  <Sidebar v-if="token"/>
  <router-view/>
</main>
</template>