<script setup lang="ts">
import { useTodoStore } from '~/store/todo';
import PageHeading from '~/components/ui/PageHeading.vue';
import Pagination from '~/components/ui/Pagination.vue';

const todoStore = useTodoStore();

const newTodo = ref('');
const newTodoCategory = ref('All');
const error = ref(false);

onMounted(async () => {
  await todoStore.loadTodos();
  await todoStore.loadCategories();
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
    <div class="flex items-center w-full gap-2">
      <TodoInput
        v-model="newTodo"
        v-model:category-value="newTodoCategory"
        :error="error"
        :loading="todoStore.isLoading"
        :categories-options="todoStore.categoriesOptions"
        @save="saveNewTodo"
      />
    </div>
    <TodoFilter
      class="mb-5"
      :loading="todoStore.isLoading"
      @change-completion="todoStore.onChangeCompletion"
      @search="todoStore.onSearch"
    />
    <TodoList
      :items="todoStore.items"
      :loading="todoStore.isLoading"
    />
    <Pagination
      :limit="todoStore.todoFilter.limit"
      :current-page="todoStore.todoFilter.page"
      :total-count="todoStore.totalCount"
      :loading="todoStore.isLoading"
      @paginate="todoStore.onPaginate"
    />
  </section>
</template>
