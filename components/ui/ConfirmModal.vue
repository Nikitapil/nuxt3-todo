<script setup lang="ts">
import AppModal from '~/components/ui/AppModal.vue';
import AppButton from '~/components/ui/AppButton.vue';

defineProps<{
  isOpened: boolean;
  title: string;
}>();

defineEmits<{
  close: [];
  confirm: [];
}>();
</script>

<template>
  <AppModal
    :is-opened="isOpened"
    @close="close"
  >
    <h2 class="text-xl font-bold text-gray-600 mb-5">{{ title }}</h2>
    <div class="w-full flex justify-between gap-2">
      <AppButton
        text="Cancel"
        class="w-full"
        appearance="danger"
        @click="$emit('close')"
      />
      <AppButton
        text="Confirm"
        class="w-full"
        @click="$emit('confirm')"
      />
    </div>
  </AppModal>
</template>

<style scoped></style>
