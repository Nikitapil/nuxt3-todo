import { Prisma } from '@prisma/client';
import {
  CreateTodoOptions, DeleteTodoOptions,
  EditTodoOptions,
  GetTodoListOptions
} from '~/src/todos/types';
import Joi from 'joi';

const todoCreateOptionsSchema = Joi.object({
  title: Joi.string().max(255).required(),
  ownerid: Joi.string().required()
});

const getTodosListOptionsSchema = Joi.object({
  ownerid: Joi.string().required(),
  page: Joi.number().positive(),
  limit: Joi.number().positive(),
  isDone: Joi.boolean(),
  search: Joi.string()
});

const editTodoOptionsSchema = Joi.object({
  id: Joi.string().required(),
  ownerid: Joi.string().required(),
  title: Joi.string().max(255),
  isDone: Joi.boolean()
});

export class Todos {
  todoModel: Prisma.TodoDelegate;

  constructor(todoModel: Prisma.TodoDelegate) {
    if (!todoModel) {
      throw new Error('TodoModel is required');
    }
    this.todoModel = todoModel;
  }

  async create(todoCreateOptions: CreateTodoOptions) {
    const params: CreateTodoOptions =
      await todoCreateOptionsSchema.validateAsync(todoCreateOptions);
    try {
      const newTodo = await this.todoModel.create({
        data: params
      });

      return newTodo;
    } catch (e) {
      throw new Error('Error while creating todo');
    }
  }

  async getTodoList(getTodoListOptions: GetTodoListOptions) {
    const params: GetTodoListOptions =
      await getTodosListOptionsSchema.validateAsync(getTodoListOptions);
    const { page = 1, limit = 10, isDone = null, search, ownerid } = params;
    const offset = page * limit - limit;
    const where: Prisma.TodoWhereInput = {
      ownerid,
      title: {
        contains: search,
        mode: 'insensitive'
      }
    };
    if (isDone !== null) {
      where.done = isDone;
    }
    const todos = await this.todoModel.findMany({
      where,
      skip: offset,
      take: limit
    });

    return todos;
  }

  async editTodo(editTodoOptions: EditTodoOptions) {
    const params: EditTodoOptions =
      await editTodoOptionsSchema.validateAsync(editTodoOptions);
    const { id, ownerid, ...todoOptions } = params;

    const todo = await this.todoModel.findUnique({
      where: {
        id,
        ownerid
      }
    });

    if (!todo) {
      throw new Error('Todo does not exist or you have no access');
    }

    const updatedTodo = await this.todoModel.update({
      where: { id },
      data: todoOptions
    });

    return updatedTodo;
  }

  async deleteTodo(deleteTodoOptions: DeleteTodoOptions) {

  }
}
