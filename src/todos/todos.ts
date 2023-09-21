import { Prisma } from '@prisma/client';
import {
  CreateTodoOptions,
  DeleteTodoOptions,
  EditTodoOptions,
  GetTodoListOptions
} from '~/src/todos/types';
import Joi from 'joi';

const todoCreateOptionsSchema = Joi.object({
  title: Joi.string().max(255).min(1).required(),
  ownerid: Joi.string().required()
});

const getTodosListOptionsSchema = Joi.object({
  ownerid: Joi.string().required(),
  page: Joi.number().positive(),
  limit: Joi.number().positive(),
  isDone: Joi.boolean(),
  search: Joi.string().allow('')
});

const editTodoOptionsSchema = Joi.object({
  id: Joi.string().required(),
  ownerid: Joi.string().required(),
  title: Joi.string().max(255).min(1),
  isDone: Joi.boolean()
});

const deleteTodoOptionsSchema = Joi.object({
  id: Joi.string().required(),
  ownerid: Joi.string().required()
});

export class Todos {
  todoModel: Prisma.TodoDelegate;

  constructor(todoModel: Prisma.TodoDelegate) {
    if (!todoModel) {
      throw new Error('TodoModel is required');
    }
    this.todoModel = todoModel;
  }

  async getTodoByTodoIdAndOwnerId(todoId: string, ownerid: string) {
    return this.todoModel.findUnique({
      where: {
        id: todoId,
        ownerid
      }
    });
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
      take: limit,
      orderBy: {
        updatedAt: 'desc'
      }
    });

    const totalCount = await this.todoModel.count({ where });

    return { todos, totalCount };
  }

  async editTodo(editTodoOptions: EditTodoOptions) {
    const params: EditTodoOptions =
      await editTodoOptionsSchema.validateAsync(editTodoOptions);
    const { id, ownerid, ...todoOptions } = params;

    const todo = await this.getTodoByTodoIdAndOwnerId(id, ownerid);

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
    const params: DeleteTodoOptions =
      await deleteTodoOptionsSchema.validateAsync(deleteTodoOptions);
    const { id, ownerid } = params;

    const todo = await this.getTodoByTodoIdAndOwnerId(id, ownerid);

    if (!todo) {
      throw new Error('Todo does not exist or you have no access');
    }

    await this.todoModel.delete({
      where: { id }
    });
  }
}
