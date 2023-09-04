<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <h1 class="text-5xl font-bold text-gray-700 mb-4">
    {{ text }}
  </h1>
</template>
