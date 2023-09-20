import { defineStore } from 'pinia';
import { Todo, TodoAdd, TodoState, TodoUpdate } from '~/types/types';
import { $fetch } from 'ofetch';
import { EApiRoutes } from '~/server/api/constants';
import { useNuxtApp } from '#app';

export const useTodoStore = defineStore('todoStore', {
  state: (): TodoState => ({
    items: []
  }),
  getters: {
    getById: (state: TodoState) => (id: string) =>
      state.items.find((item) => item.id === id),
    getOrderedTodos: (state: TodoState) =>
      [...state.items].sort(
        (a: Todo, b: Todo) => b.createdAt.getTime() - a.createdAt.getTime()
      )
  },
  actions: {
    async add(partialTodo: TodoAdd) {
      const data = await $fetch(EApiRoutes.CREATE_TODO, {
        method: 'POST',
        body: partialTodo
      });

      if (data.error) {
        const { $toast } = useNuxtApp();
        $toast(data.error);
      }
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
