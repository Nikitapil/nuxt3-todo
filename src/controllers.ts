import { PrismaClient } from '@prisma/client';
import { Users } from '~/src/users/users';
import { Todos } from '~/src/todos/todos';

const client = new PrismaClient();

export const users = new Users(client.user);
export const todos = new Todos(client.todo);
