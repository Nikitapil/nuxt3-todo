<script setup lang="ts">
import { useTodoStore } from '~/store/todo';

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

  console.log(todoStore.items);
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
  <section class="text-center py-10">
    <h1 class="text-5xl font-bold text-gray-700">What are we doing today?</h1>
  </section>
  <section class="py-4 rounded-lg">
    <todo-input
      v-model="newTodo"
      :error="error"
      @save="saveNewTodo"
    ></todo-input>
    <todo-list :items="todoStore.getOrderedTodos" />
  </section>
</template>
