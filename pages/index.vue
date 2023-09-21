<script setup lang="ts">
import { useTodoStore } from '~/store/todo';
import PageHeading from '~/components/ui/PageHeading.vue';
import Pagination from '~/components/ui/Pagination.vue';

const todoStore = useTodoStore();

const newTodo = ref('');
const error = ref(false);

onMounted(async () => {
  await todoStore.loadTodos();
});

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
    <TodoFilter
      class="mb-5"
      @change-completion="todoStore.onChangeCompletion"
    />
    <TodoList :items="todoStore.items" />
    <Pagination
      :limit="todoStore.todoFilter.limit"
      :current-page="todoStore.todoFilter.page"
      :total-count="todoStore.totalCount"
      @paginate="todoStore.onPaginate"
    />
  </section>
</template>
