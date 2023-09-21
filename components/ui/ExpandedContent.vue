<script setup lang="ts">
import AppButton from '~/components/ui/AppButton.vue';
import {
  ChevronRightIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline/index.js';

defineProps<{
  title: string;
}>();

const isOpen = ref(false);

const toggleContent = () => (isOpen.value = !isOpen.value);
</script>

<template>
  <div class="min-h-20 w-full bg-white p-5 rounded-md">
    <div class="flex justify-between items-center w-full">
      <h3 class="font-bold">{{ title }}</h3>
      <AppButton
        appearance="transparent"
        @click="toggleContent"
      >
        <ChevronDownIcon
          v-if="isOpen"
          class="text-gray-600 w-6 h-6"
        />
        <ChevronRightIcon
          v-else
          class="text-gray-600 w-6 h-6"
        />
      </AppButton>
    </div>
    <div
      v-if="isOpen"
      class="border-t-2 pt-2"
    >
      <slot></slot>
    </div>
  </div>
</template>
