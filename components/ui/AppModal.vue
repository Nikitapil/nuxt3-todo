<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline/index.js';
import AppButton from '~/components/ui/AppButton.vue';

defineProps<{
  isOpened: boolean;
}>();

defineEmits<{
  close: [];
}>();
</script>

<template>
  <Transition name="modal">
    <div
      v-if="isOpened"
      class="modal"
    >
      <div
        class="modal__overlay"
        @click="$emit('close')"
      />
      <div class="modal__content">
        <AppButton
          class="pad-0 absolute top-1 right-0.5"
          appearance="transparent"
          @click="$emit('close')"
        >
          <XMarkIcon
            class="w-6 h-6 text-black hover:text-red-700 transition-all duration-300"
          />
        </AppButton>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal__overlay {
  width: 100%;
  min-height: 100vh;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
}

.modal__content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 6;
  min-height: 100px;
  min-width: 320px;
  border-radius: 16px;
  padding: 10px;
  padding-top: 24px;
}
</style>
<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
