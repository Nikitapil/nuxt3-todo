<script setup lang="ts">
import AppButton from '~/components/ui/AppButton.vue';

const props = defineProps<{
  currentPage: number;
  totalCount: number;
  limit: number;
}>();

defineEmits<{
  paginate: [number];
}>();

const amountOfPages = computed(() => Math.ceil(props.totalCount / props.limit));
</script>

<template>
  <div
    v-if="amountOfPages > 1"
    class="flex flex-wrap gap-2"
  >
    <AppButton
      v-for="page in amountOfPages"
      :key="page"
      :disabled="page === currentPage"
      class="px-0"
      appearance="transparent"
      @click="$emit('paginate', page)"
    >
      <span
        class="text-black text-md font-bold"
        :class="{
          'text-red-400': page === currentPage,
          'hover:text-red-300': page !== currentPage
        }"
        >{{ page }}</span
      >
    </AppButton>
  </div>
</template>
