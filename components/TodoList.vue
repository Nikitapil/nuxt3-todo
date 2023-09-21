<script lang="ts" setup>
import { Todo } from '~/types/types';

defineProps<{
  items: Todo[];
}>();
</script>

<template>
  <section v-if="items.length">
    <TodoItem
      v-for="item in items"
      :key="item.id"
      :todo="item"
    />
  </section>
</template>
