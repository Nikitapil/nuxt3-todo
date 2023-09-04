<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  id: string;
  name: string;
  placeholder: string;
  type: 'text' | 'password' | 'email';
  modelValue: string;
}>();
const emit = defineEmits<{
  'update:modelValue': [string];
}>();

const value = useVModel(props, 'modelValue', emit);
</script>

<template>
  <input
    :id="id"
    v-model="value"
    class="px-2 py-3 rounded-md outline-none shadow-md focus-visible:border-2 focus-visible:border-blue-200"
    :placeholder="placeholder"
    :type="type"
    :name="name"
  />
</template>
