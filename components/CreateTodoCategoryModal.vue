<script setup lang="ts">
import AppModal from '~/components/ui/AppModal.vue';
import AppInput from '~/components/ui/AppInput.vue';
import AppButton from '~/components/ui/AppButton.vue';

defineProps<{
  isOpened: boolean;
}>();

const emit = defineEmits<{
  close: [];
  create: [string];
}>();

const newCategory = ref('');

const onCreate = () => {
  if (newCategory.value.trim()) {
    emit('create', newCategory.value);
  }
};
</script>

<template>
  <AppModal
    :is-opened="isOpened"
    @close="$emit('close')"
  >
    <h3>Create new category</h3>
    <AppInput
      id="newCategory"
      v-model="newCategory"
      class="border-2 w-full my-4 min-w-[320px]"
      name="newCategory"
      placeholder="New category..."
      type="text"
    />
    <div class="w-full flex justify-between gap-2">
      <AppButton
        text="Cancel"
        class="w-full"
        appearance="danger"
        @click="$emit('close')"
      />
      <AppButton
        text="Create"
        class="w-full"
        @click="onCreate"
      />
    </div>
  </AppModal>
</template>
