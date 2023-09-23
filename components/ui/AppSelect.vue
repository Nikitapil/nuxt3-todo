<script setup lang="ts">
import { AppSelectOptions } from '~/types/types';

defineProps<{
  options: AppSelectOptions[];
  value: string;
  id: string;
  disabled?: boolean;
}>();

defineEmits<{
  change: [string];
}>();
</script>

<template>
  <select
    :id="id"
    class="px-2 py-2 rounded-md outline-none shadow-md focus-visible:border-2 focus-visible:border-blue-200"
    :value="value"
    :disabled="disabled"
    @change="$emit('change', $event.target.value)"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>
