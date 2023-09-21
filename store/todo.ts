import { defineStore } from 'pinia';
import {
  Todo,
  TodoAdd,
  TodoCompletionStatus,
  TodoState,
  TodoUpdate
} from '~/types/types';
import { $fetch } from 'ofetch';
import { EApiRoutes } from '~/server/api/constants';
import { useNuxtApp } from '#app';

export const useTodoStore = defineStore('todoStore', {
  state: (): TodoState => ({
    items: [],
    isLoading: false,
    todoFilter: {
      page: 1,
      limit: 10,
      isDone: undefined,
      search: ''
    },
    totalCount: 0
  }),
  getters: {
    getById: (state: TodoState) => (id: string) =>
      state.items.find((item) => item.id === id)
  },
  actions: {
    async loadTodos() {
      this.isLoading = true;
      const data = await $fetch(EApiRoutes.GET_TODOS, {
        method: 'POST',
        body: this.todoFilter
      });
      if (data.error) {
        const { $toast } = useNuxtApp();
        $toast(data.error);
        return;
      }
      this.items = data.result?.todos;
      this.totalCount = data.result?.totalCount;
      this.isLoading = false;
    },
    async onPaginate(page: number) {
      this.todoFilter.page = page;
      await this.loadTodos();
    },
    async onChangeCompletion(completionStatus: TodoCompletionStatus) {
      switch (completionStatus) {
        case 'completed':
          this.todoFilter.isDone = true;
          break;
        case 'uncompleted':
          this.todoFilter.isDone = false;
          break;
        default:
          this.todoFilter.isDone = undefined;
      }

      await this.loadTodos();
    },
    async add(partialTodo: TodoAdd) {
      this.isLoading = true;
      const data = await $fetch(EApiRoutes.CREATE_TODO, {
        method: 'POST',
        body: partialTodo
      });

      if (data.error) {
        const { $toast } = useNuxtApp();
        $toast(data.error);
        return;
      }
      this.todoFilter = {
        page: 1,
        limit: 10,
        isDone: undefined,
        search: ''
      };
      await this.loadTodos();
      this.isLoading = false;
    },
    remove(id: string) {
      this.items = this.items.filter((item: Todo) => item.id !== id);
    },
    update(id: string, updatedTodo: TodoUpdate) {
      const index = this.items.findIndex((item: Todo) => item.id === id);
      if (index !== -1) {
        this.items[index] = {
          ...this.items[index],
          ...updatedTodo,
          updatedAt: new Date()
        };
      }
    }
  }
});
