<script setup lang="ts">
defineProps<{
  disabled: boolean;
  text?: string;
}>();
</script>

<template>
  <button
    class="p-3 bg-blue-500 text-white rounded-md disabled:bg-gray-400 disabled:text-white hover:opacity-80 transition-all duration-300"
    :disabled="disabled"
  >
    <slot>{{ text }}</slot>
  </button>
</template>
