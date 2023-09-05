<script lang="ts" setup>
import {
  XCircleIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline/index.js';
import { useTodoStore } from '~~/store/todo';
import { Todo } from '~~/store/todo';
import EditableText from '~/components/ui/EditableText.vue';

const props = defineProps<{
  todo: Todo;
}>();

const textRef = ref<InstanceType<typeof EditableText>>(null);

const todoStore = useTodoStore();
const deleteTodo = () => todoStore.remove(props.todo.id);

const updateTodoDone = () => {
  todoStore.update(props.todo.id, { done: !props.todo.done });
};

const updateTodoTitle = (newTitle: string) => {
  if (newTitle) {
    todoStore.update(props.todo.id, { title: newTitle });
  }
  if (textRef) {
    textRef.value.close();
  }
};

const parsedDate = computed(() =>
  new Intl.DateTimeFormat().format(new Date(props.todo.createdAt))
);
</script>

<template>
  <div
    class="w-full mx-auto bg-white rounded-md shadow-md pb-5 px-10 flex items-center justify-between mb-5"
  >
    <div class="max-w-10/12 text-ellipsis flex-1 mt-5">
      <div class="mr-3">
        <EditableText
          :id="todo.id"
          ref="textRef"
          :text="todo.title"
          :name="todo.id"
          @save="updateTodoTitle"
        >
          <h1
            :class="{ 'line-through': todo.done }"
            class="text-2xl text-gray-700 font-light uppercase overflow-anywhere"
            :title="todo.title"
          >
            {{ todo.title }}
          </h1>
        </EditableText>
      </div>
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
