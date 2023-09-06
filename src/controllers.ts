import { PrismaClient } from '@prisma/client';
import { Users } from '~/src/users/users';

const client = new PrismaClient();

export const users = new Users(client.user);
