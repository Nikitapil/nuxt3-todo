<script setup lang="ts">
import AppButton from '~/components/ui/AppButton.vue';
import {
  PencilIcon,
  DocumentCheckIcon
} from '@heroicons/vue/24/outline/index.js';
import AppInput from '~/components/ui/AppInput.vue';

const props = defineProps<{
  text: string;
  id: string;
  name: string;
  disabled?: boolean;
}>();

defineEmits<{
  save: [text: string];
}>();

const isEditMode = ref(false);
const textToEdit = ref('');

const onOpenInput = () => {
  textToEdit.value = props.text;
  isEditMode.value = true;
};

const close = () => {
  isEditMode.value = false;
};

defineExpose({ close });
</script>

<template>
  <div class="flex justify-between align- w-full">
    <div v-if="!isEditMode">
      <slot>{{ text }}</slot>
    </div>
    <AppInput
      v-else
      :id="id"
      v-model="textToEdit"
      class="border-2 w-full mr-1.5"
      :name="name"
      :disabled="disabled"
      placeholder=""
      type="text"
    />
    <AppButton
      v-if="!isEditMode"
      class="pad-0"
      appearance="transparent"
      :disabled="disabled"
      @click="onOpenInput"
    >
      <PencilIcon
        class="w-8 h-8 transition-all duration-200 text-yellow-600 hover:text-red-600"
      />
    </AppButton>
    <AppButton
      v-else
      class="pad-0"
      appearance="transparent"
      :disabled="disabled"
      @click="$emit('save', textToEdit)"
    >
      <DocumentCheckIcon
        class="w-8 h-8 transition-all duration-200 text-yellow-600 hover:text-green-600"
      />
    </AppButton>
  </div>
</template>

<style scoped></style>
