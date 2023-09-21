<script setup lang="ts">
import ExpandedContent from '~/components/ui/ExpandedContent.vue';
import AppSelect from '~/components/ui/AppSelect.vue';
import { completionOptions } from '~/constants/todo-constants';
import AppInput from '~/components/ui/AppInput.vue';
import AppButton from '~/components/ui/AppButton.vue';

const emit = defineEmits<{
  changeCompletion: [string];
  search: [string];
}>();

const search = ref('');

const onChangeCompletion = (completionStatus: string) => {
  emit('changeCompletion', completionStatus);
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
        value="all"
        @change="onChangeCompletion"
      />
      <AppInput
        id="search"
        v-model="search"
        class="border-2 !py-2"
        name="search"
        placeholder="Search todo..."
        type="text"
      />
      <AppButton
        class="py-2"
        text="Search"
        @click="onSearch"
      />
    </div>
  </ExpandedContent>
</template>
