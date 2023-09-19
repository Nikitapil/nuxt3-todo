import { Prisma } from '@prisma/client';
import { CreateTodoOptions } from '~/src/todos/types';
import Joi from 'joi';

const todoCreateOptionsSchema = Joi.object({
  title: Joi.string().max(255).required(),
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

  async create(todoCreateOptions: CreateTodoOptions) {
    const params =
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
}
