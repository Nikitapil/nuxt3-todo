<script setup lang="ts">
import ExpandedContent from '~/components/ui/ExpandedContent.vue';
import AppSelect from '~/components/ui/AppSelect.vue';
import { completionOptions } from '~/constants/todo-constants';

const emit = defineEmits<{
  changeCompletion: [string];
}>();

const onChangeCompletion = (completionStatus: string) => {
  emit('changeCompletion', completionStatus);
};
</script>

<template>
  <ExpandedContent title="Todo Filter">
    <label
      class="mr-1"
      for="completion"
    >
      Completion:
    </label>
    <AppSelect
      id="completion"
      class="border-2"
      :options="completionOptions"
      value="all"
      @change="onChangeCompletion"
    />
  </ExpandedContent>
</template>
