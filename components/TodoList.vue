<script lang="ts" setup>
import { Todo } from '~/types/types';

defineProps<{
  items: Todo[];
  loading: boolean;
}>();
</script>

<template>
  <section v-if="items.length">
    <TodoItem
      v-for="item in items"
      :key="item.id"
      :loading="loading"
      :todo="item"
    />
  </section>
</template>
