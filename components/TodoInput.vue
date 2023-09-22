<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import AppInput from '~/components/ui/AppInput.vue';
import AppButton from '~/components/ui/AppButton.vue';

const props = defineProps<{
  modelValue: string;
  error: boolean;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'save'): void;
}>();

const todo = useVModel(props, 'modelValue', emit);
</script>

<template>
  <div
    class="w-full mx-auto h-24 bg-white rounded-md shadow-sm py-5 px-10 flex items-center justify-between mb-5 border-red-300"
  >
    <AppInput
      id="new-todo"
      v-model="todo"
      name="new-todo"
      placeholder="Create a todo"
      type="text"
      class="border-2 w-full mr-4"
      :class="{ 'border-red-300': error, 'border-gray-300': !error }"
      :disabled="loading"
    />
    <AppButton
      text="Save"
      class="px-5"
      :disabled="loading"
      @click="$emit('save')"
    />
  </div>
</template>
