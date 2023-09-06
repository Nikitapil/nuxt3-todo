import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { Todo, TodoAdd, TodoState, TodoUpdate } from '~/types/types';

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
    add(partialTodo: TodoAdd) {
      const todo: Todo = {
        id: uuid(),
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...partialTodo
      };
      this.items.push(todo);
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
