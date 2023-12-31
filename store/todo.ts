import { defineStore } from 'pinia';
import {
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
      search: '',
      category: undefined
    },
    totalCount: 0,
    categories: []
  }),
  getters: {
    categoriesOptions: (state) => [
      { name: 'All', value: 'All' },
      ...state.categories.map((category) => ({
        name: category.name,
        value: category.id
      }))
    ]
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
    async loadCategories() {
      const data = await $fetch(EApiRoutes.GET_CATEGORIES);
      if (data.error) {
        const { $toast } = useNuxtApp();
        $toast(data.error);
        return;
      }
      this.categories = data.result;
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

    async onChangeCategory(category: string) {
      this.todoFilter.category = category === 'All' ? undefined : category;
      await this.loadTodos();
    },

    async onSearch(search: string) {
      this.todoFilter.search = search;
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
        this.isLoading = false;
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
    async remove(id: string) {
      this.isLoading = true;
      const data = await $fetch(EApiRoutes.DELETE_TODO, {
        method: 'DELETE',
        body: { id }
      });

      if (data.error) {
        const { $toast } = useNuxtApp();
        $toast(data.error);
        this.isLoading = false;
        return;
      }

      await this.loadTodos();
    },
    async update(id: string, updatedTodo: TodoUpdate) {
      this.isLoading = true;
      const data = await $fetch(EApiRoutes.EDIT_TODO, {
        method: 'PUT',
        body: { ...updatedTodo, id }
      });
      if (data.error) {
        const { $toast } = useNuxtApp();
        $toast(data.error);
        this.isLoading = false;
        return;
      }
      this.items = this.items.map((todo) => {
        if (todo.id === id) {
          return data.result;
        }
        return todo;
      });
      this.isLoading = false;
    },

    async createCategory(name: string) {
      const data = await $fetch(EApiRoutes.CREATE_CATEGORY, {
        method: 'POST',
        body: { name }
      });

      if (data.error) {
        const { $toast } = useNuxtApp();
        $toast(data.error);
        this.isLoading = false;
        return null;
      }

      await this.loadCategories();
      return data.result?.id;
    }
  }
});
