<script lang="ts" setup>
import {
  XCircleIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline/index.js';
import { useTodoStore } from '~~/store/todo';
import { Todo } from '~~/store/todo';

const props = defineProps<{
  todo: Todo;
}>();

const todoStore = useTodoStore();
const deleteTodo = () => todoStore.remove(props.todo.id);

const updateTodoDone = () => {
  todoStore.update(props.todo.id, { done: !props.todo.done });
};

const parsedDate = computed(() =>
  new Intl.DateTimeFormat('en-US').format(new Date(props.todo.createdAt))
);
</script>

<template>
  <div
    class="w-10/12 sm:w-8/12 max-w-lg mx-auto h-24 bg-white rounded-md shadow-md p-5 px-10 flex items-center justify-between mb-5"
  >
    <div class="max-w-10/12 overflow-hidden whitespace-nowrap text-ellipsis">
      <h1
        :class="{
          'line-through': todo.done
        }"
        class="text-2xl text-gray-700 select-none font-light uppercase"
        :title="todo.title"
      >
        {{ todo.title }}
      </h1>
      <p>
        <small class="text-gray-400">
          {{ parsedDate }}
        </small>
      </p>
    </div>
    <section class="flex items-center">
      <check-circle-icon
        class="w-10 h-10 transition-all duration-200 hover:text-green-400 mr-3 cursor-pointer"
        :class="{
          'text-green-400': todo.done,
          'text-gray-400': !todo.done
        }"
        @click="updateTodoDone()"
      />
      <XCircleIcon
        class="w-10 h-10 transition-all duration-200 text-red-400 cursor-pointer hover:text-red-600"
        @click="deleteTodo"
      />
    </section>
  </div>
</template>
