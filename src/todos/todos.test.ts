import { PrismaClient } from '@prisma/client';
import { Todos } from './todos';
import { beforeAll } from 'vitest';
import { Users } from '../users/users';

const client = new PrismaClient();

describe('todos tests', () => {
  let id = '';

  beforeAll(async () => {
    const { token } = await new Users(client.user).add({
      email: 'testDb2@test.test',
      password: '123456789',
      passwordConfirm: '123456789'
    });

    const userData = Users.getUserInfoFromToken(token);
    id = userData?.id as string;
  });

  afterAll(async () => {
    await client.user.delete({
      where: { email: 'testDb2@test.test' }
    });
  });

  test('throws if constructor options are invalid');
  // @ts-ignore
  expect(() => new Todos()).throws();

  test('define todosModel', () => {
    const todos = new Todos(client.todo);

    expect(todos.todoModel).toBeDefined();
  });

  describe('todo create tests', () => {
    const todoController = new Todos(client.todo);

    test('should throw if no title', async () => {
      // @ts-ignore
      await expect(todoController.create({})).rejects.toThrow(
        '"title" is required'
      );
    });

    test('should throw if title is empty string', async () => {
      // @ts-ignore
      await expect(todoController.create({ title: '' })).rejects.toThrow(
        '"title" is not allowed to be empty'
      );
    });

    test('should throw if title is longer than 255', async () => {
      const title = '1'.repeat(256);
      // @ts-ignore
      await expect(todoController.create({ title })).rejects.toThrow(
        '"title" length must be less than or equal to 255 characters long'
      );
    });

    test('should throw if title is not string', async () => {
      // @ts-ignore
      await expect(todoController.create({ title: 1234 })).rejects.toThrow(
        '"title" must be a string'
      );
    });

    test('should throw if no owner id', async () => {
      // @ts-ignore
      await expect(todoController.create({ title: '1234' })).rejects.toThrow(
        '"ownerid" is required'
      );
    });

    test('should throw if owner id is not string', async () => {
      await expect(
        // @ts-ignore
        todoController.create({ title: '1234', ownerid: 1234 })
      ).rejects.toThrow('"ownerid" must be a string');
    });

    test('should throw if category is not string', async () => {
      await expect(
        // @ts-ignore
        todoController.create({ title: '1234', ownerid: id, category: 123 })
      ).rejects.toThrow('"category" must be a string');
    });

    test('should create and return todo', async () => {
      const todo = await todoController.create({
        title: 'test todo',
        ownerid: id
      });

      expect(todo).toStrictEqual({
        id: expect.any(String),
        ownerid: id,
        title: 'test todo',
        done: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        category: null
      });

      await client.todo.delete({
        where: { id: todo.id }
      });
    });
  });

  describe('getTodoList tests', () => {
    const todoController = new Todos(client.todo);

    test('should throw if no ownerid', async () => {
      // @ts-ignore
      await expect(todoController.getTodoList({})).rejects.toThrow(
        '"ownerid" is required'
      );
    });

    test('should throw if page is zero', async () => {
      await expect(
        todoController.getTodoList({ ownerid: id, page: 0 })
      ).rejects.toThrow('"page" must be a positive number');
    });

    test('should throw if page is negative number', async () => {
      await expect(
        todoController.getTodoList({ ownerid: id, page: -1 })
      ).rejects.toThrow('"page" must be a positive number');
    });

    test('should throw if page is not of type number', async () => {
      await expect(
        // @ts-ignore
        todoController.getTodoList({ ownerid: id, page: '-1' })
      ).rejects.toThrow('"page" must be a positive number');
    });

    test('should throw if limit is zero', async () => {
      await expect(
        todoController.getTodoList({ ownerid: id, page: 1, limit: 0 })
      ).rejects.toThrow('"limit" must be a positive number');
    });

    test('should throw if limit is negative number', async () => {
      await expect(
        todoController.getTodoList({ ownerid: id, page: 1, limit: -1 })
      ).rejects.toThrow('"limit" must be a positive number');
    });

    test('should throw if limit is not of type number', async () => {
      await expect(
        // @ts-ignore
        todoController.getTodoList({ ownerid: id, limit: '-1', page: 1 })
      ).rejects.toThrow('"limit" must be a positive number');
    });

    test('should throw if isDone not a boolean', async () => {
      await expect(
        todoController.getTodoList({
          ownerid: id,
          limit: 10,
          page: 1,
          // @ts-ignore
          isDone: '123'
        })
      ).rejects.toThrow('"isDone" must be a boolean');
    });

    test('should throw if search not a string', async () => {
      await expect(
        todoController.getTodoList({
          ownerid: id,
          limit: 10,
          page: 1,
          // @ts-ignore
          search: ''
        })
      ).resolves.not.toThrow('"search" is not allowed to be empty');
    });

    test('should throw if category not a string', async () => {
      await expect(
        todoController.getTodoList({
          ownerid: id,
          limit: 10,
          page: 1,
          // @ts-ignore
          category: 123
        })
      ).rejects.toThrow('"category" must be a string');
    });

    test('should return empty array if no todo', async () => {
      const todos = await todoController.getTodoList({
        ownerid: id,
        limit: 10,
        page: 1
      });

      expect(todos).toStrictEqual({ todos: [], totalCount: 0 });
    });

    test('should return created todo', async () => {
      const todo = await todoController.create({
        title: 'test todo',
        ownerid: id
      });

      const todos = await todoController.getTodoList({
        ownerid: id,
        limit: 10,
        page: 1
      });

      expect(todos).toStrictEqual({
        todos: [{ ...todo, Category: null }],
        totalCount: 1
      });

      await client.todo.delete({
        where: { id: todo.id }
      });
    });

    test('should return todos with done filter', async () => {
      let todo = await todoController.create({
        title: 'test todo',
        ownerid: id
      });

      todo = await client.todo.update({
        where: { id: todo.id },
        data: { done: true }
      });

      const todos = await todoController.getTodoList({
        ownerid: id,
        limit: 10,
        page: 1,
        isDone: true
      });

      expect(todos).toStrictEqual({
        todos: [{ ...todo, Category: null }],
        totalCount: 1
      });

      const todos2 = await todoController.getTodoList({
        ownerid: id,
        limit: 10,
        page: 1,
        isDone: false
      });

      expect(todos2).toStrictEqual({
        todos: [],
        totalCount: 0
      });

      await client.todo.delete({
        where: { id: todo.id }
      });
    });
  });
});
