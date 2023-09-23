import { PrismaClient } from '@prisma/client';
import { Users } from '~/src/users/users';
import { Todos } from '~/src/todos/todos';
import { Categories } from '~/src/categories/categories';

const client = new PrismaClient();

export const users = new Users(client.user);
export const todos = new Todos(client.todo);
export const categories = new Categories(client.category);
