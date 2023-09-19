<script lang="ts" setup>
import {
  XCircleIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline/index.js';
import { useTodoStore } from '~~/store/todo';
import EditableText from '~/components/ui/EditableText.vue';
import AppButton from '~/components/ui/AppButton.vue';
import ConfirmModal from '~/components/ui/ConfirmModal.vue';
import { Todo } from '~/types/types';

const props = defineProps<{
  todo: Todo;
}>();

const textRef = ref<InstanceType<typeof EditableText>>(null);
const isDeleteModalOpened = ref(false);

const todoStore = useTodoStore();

const closeDeleteModal = () => (isDeleteModalOpened.value = false);

const deleteTodo = () => {
  todoStore.remove(props.todo.id);
  closeDeleteModal();
};

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

const checkIconClass = computed(() =>
  props.todo.done ? 'text-green-400' : 'text-gray-400'
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
            class="text-2xl text-gray-700 font-light overflow-anywhere"
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
      <AppButton
        class="pad-0 mr-2"
        appearance="transparent"
        @click="updateTodoDone"
      >
        <check-circle-icon
          class="w-10 h-10 transition-all duration-200 hover:text-green-400 cursor-pointer"
          :class="checkIconClass"
        />
      </AppButton>
      <AppButton
        class="pad-0"
        appearance="transparent"
        @click="isDeleteModalOpened = true"
      >
        <XCircleIcon
          class="w-10 h-10 transition-all duration-200 text-red-400 cursor-pointer hover:text-red-600"
        />
      </AppButton>
    </section>
    <ConfirmModal
      title="Are you sure you want to delete a todo?"
      :is-opened="isDeleteModalOpened"
      @close="closeDeleteModal"
      @confirm="deleteTodo"
    />
  </div>
</template>
