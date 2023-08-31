import {defineStore} from "pinia";
import { v4 as uuid } from 'uuid'

export interface Todo {
    id: string;
    title: string;
    done: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TodoState {
    items: Todo[];
}

export interface TodoAdd {
    title: string;
}

export interface TodoUpdate {
    title?: string;
    done?: boolean;
}

const state = (): TodoState => ({
    items: []
});

const getters = {
    getById: (state: TodoState) => (id: string) => state.items.find(item => item.id === id),
    getOrderedTodos: (state: TodoState) => [...state.items].sort((a: Todo, b: Todo) =>  b.createdAt.getTime() - a.createdAt.getTime())
};

export const useTodoStore = defineStore('todoStore', {
    state,
    getters,
    actions: {
        add(partialTodo: TodoAdd) {
            const todo: Todo = {
                id: uuid(),
                done: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                ...partialTodo,
            }
            this.items.push(todo);
        },
        remove(id: string) {
            this.items = this.items.filter((item: Todo) => item.id !== id)
        },
        update(id: string, updatedTodo: TodoUpdate) {
            const index = this.items.findIndex((item: Todo) => item.id === id)
            if (index !== -1) {
                this.items[index] = {...this.items[index], ...updatedTodo, updatedAt: new Date()}
            }
        }
    }
})