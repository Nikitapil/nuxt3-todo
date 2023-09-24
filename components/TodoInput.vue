<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import AppInput from '~/components/ui/AppInput.vue';
import AppButton from '~/components/ui/AppButton.vue';
import AppSelect from '~/components/ui/AppSelect.vue';
import { AppSelectOptions } from '~/types/types';

const props = defineProps<{
  modelValue: string;
  categoryValue: string;
  error: boolean;
  loading: boolean;
  categoriesOptions: AppSelectOptions[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:categoryValue', value: string): void;
  (e: 'save'): void;
  (e: 'open-create-category-modal'): void;
}>();

const todo = useVModel(props, 'modelValue', emit);
const category = useVModel(props, 'categoryValue', emit);

const onChangeCategory = (cat: string) => (category.value = cat);
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
    <div class="flex items-center">
      <AppSelect
        id="todoCreateCategory"
        :options="categoriesOptions"
        :value="categoryValue"
        @change="onChangeCategory"
      />
      <AppButton
        class="text-3xl !text-black hover:opacity-50"
        appearance="transparent"
        text="+"
        @click="$emit('open-create-category-modal')"
      />
    </div>
    <AppButton
      text="Save"
      class="px-5"
      :disabled="loading"
      @click="$emit('save')"
    />
  </div>
</template>
