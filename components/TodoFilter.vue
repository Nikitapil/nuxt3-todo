<script setup lang="ts">
import ExpandedContent from '~/components/ui/ExpandedContent.vue';
import AppSelect from '~/components/ui/AppSelect.vue';
import { completionOptions } from '~/constants/todo-constants';
import AppInput from '~/components/ui/AppInput.vue';
import AppButton from '~/components/ui/AppButton.vue';
import { AppSelectOptions } from '~/types/types';

defineProps<{
  loading: boolean;
  categoryOptions: AppSelectOptions[];
}>();

const emit = defineEmits<{
  changeCompletion: [string];
  changeCategory: [string];
  search: [string];
}>();

const search = ref('');
const completion = ref('all');
const category = ref('All');

const onChangeCompletion = (completionStatus: string) => {
  completion.value = completionStatus;
  emit('changeCompletion', completionStatus);
};

const onChangeCategory = (cat: string) => {
  category.value = cat;
  emit('changeCategory', cat);
};

const onSearch = () => {
  emit('search', search.value);
};
</script>

<template>
  <ExpandedContent title="Todo Filter">
    <div class="flex items-center gap-2 flex-wrap">
      <label
        class="mr-1"
        for="completion"
      >
        Completion:
      </label>
      <AppSelect
        id="completion"
        class="border-2 mr-4"
        :options="completionOptions"
        :disabled="loading"
        :value="completion"
        @change="onChangeCompletion"
      />
      <label
        class="mr-1"
        for="category_filter"
      >
        Category:
      </label>
      <AppSelect
        id="category_filter"
        class="border-2 mr-4"
        :options="categoryOptions"
        :disabled="loading"
        :value="category"
        @change="onChangeCategory"
      />
      <AppInput
        id="search"
        v-model="search"
        class="border-2 !py-2"
        name="search"
        placeholder="Search todo..."
        type="text"
        :disabled="loading"
      />
      <AppButton
        class="py-2"
        text="Search"
        :disabled="loading"
        @click="onSearch"
      />
    </div>
  </ExpandedContent>
</template>
