<template>
  <div class="bg-gray-200 min-h-screen">
    <AppHeader />
    <main class="pt-18 px-5">
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';
</script>
