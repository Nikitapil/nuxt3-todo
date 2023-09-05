<script setup lang="ts">
import { useTodoStore } from '~/store/todo';
import PageHeading from '~/components/ui/PageHeading.vue';

const todoStore = useTodoStore();

const newTodo = ref('');
const error = ref(false);

const saveNewTodo = () => {
  if (!newTodo.value.length) {
    error.value = true;
    return;
  }

  todoStore.add({ title: newTodo.value });

  newTodo.value = '';
};

watch(error, (value: boolean) => {
  if (value) {
    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
});
</script>

<template>
  <section class="text-center pt-10">
    <PageHeading text="What are we doing today?" />
  </section>
  <section class="py-4 rounded-lg">
    <TodoInput
      v-model="newTodo"
      :error="error"
      @save="saveNewTodo"
    ></TodoInput>
    <TodoList :items="todoStore.getOrderedTodos" />
  </section>
</template>
