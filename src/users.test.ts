import { beforeAll, vi } from 'vitest';
import { TOKEN_EXPIRY_DAYS, Users } from './users';
import { PrismaClient } from '@prisma/client';
import JWT from 'jsonwebtoken';

const client = new PrismaClient();

describe('users', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  test('throws if constructor options invalid', () => {
    // @ts-ignore
    expect(() => new Users()).throws();
  });

  test('returns a Users object', () => {
    const users = new Users(client.user);

    expect(users.UserModel).toBeDefined();
  });

  test('throws if options are invalid', async () => {
    // @ts-ignore
    await expect(Users.hashPassword()).rejects.toThrow(
      'data and salt arguments required'
    );
  });

  test('hashes a password', async () => {
    const hash = await Users.hashPassword('password');

    expect(hash).toMatch('$2b$05');
  });

  test('returns false if password is incorrect', async () => {
    const result = await Users.isValidPassword('password', 'hash');
    expect(result).toBe(false);
  });

  test('returns true if password is correct', async () => {
    const hash = await Users.hashPassword('password');
    const result = await Users.isValidPassword('password', hash);
    expect(result).toBe(true);
  });

  test('throws if no user is passed', () => {
    // @ts-ignore
    expect(() => Users.createToken()).throws();
  });

  test('create a token', () => {
    // @ts-ignore
    const data = Users.createToken({ id: '123', email: 'testDb@test.test' });
    expect(data).toStrictEqual({
      token: expect.any(String),
      expiryInDays: TOKEN_EXPIRY_DAYS
    });
  });

  test('get user info from token', () => {
    // @ts-ignore
    const data = Users.createToken({ id: '123', email: 'testDb@test.test' });
    const userData = Users.getUserInfoFromToken(data.token);

    expect(userData).toStrictEqual({
      id: '123',
      email: 'testDb@test.test'
    });
  });

  test('getUsersInfoFromToken - return undefined if an error occures', () => {
    const mock = vi.spyOn(JWT, 'verify').mockImplementation(() => {
      throw new Error('');
    });

    const result = Users.getUserInfoFromToken('1234');
    expect(mock).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  describe('users - add', () => {
    test('throws if options are invalid', async () => {
      // @ts-ignore
      await expect(new Users(client.user).add()).rejects.toThrow(
        '"value" is required'
      );
    });

    test('throws if options are invalid', async () => {
      // @ts-ignore
      await expect(new Users(client.user).add(null)).rejects.toThrow(
        '"value" must be of type object'
      );
    });

    test('throws if options are invalid', async () => {
      // @ts-ignore
      await expect(new Users(client.user).add({})).rejects.toThrow(
        '"email" is required'
      );
    });

    test('throws if options are invalid', async () => {
      // @ts-ignore
      await expect(new Users(client.user).add({ email: null })).rejects.toThrow(
        '"email" must be a string'
      );
    });

    test('throws if options are invalid', async () => {
      // @ts-ignore
      await expect(new Users(client.user).add({ email: '' })).rejects.toThrow(
        '"email" is not allowed to be empty'
      );
    });

    test('returns a user', async () => {
      const userController = new Users(client.user);

      const user = await userController.add({
        email: 'testDb@test.test',
        password: '123456789',
        passwordConfirm: '123456789'
      });

      expect(user).toStrictEqual({
        id: expect.any(String),
        email: 'testDb@test.test',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      });

      await client.user.delete({
        where: { id: user.id }
      });
    });

    test('throws if email already exists', async () => {
      const userController = new Users(client.user);

      const userMock = {
        email: 'testDb@test.test',
        password: '123456789',
        passwordConfirm: '123456789'
      };

      const user = await userController.add(userMock);

      // @ts-ignore
      await expect(userController.add(userMock)).rejects.toThrow();

      await client.user.delete({
        where: { id: user.id }
      });
    });
  });

  describe('users - login', () => {
    beforeAll(async () => {
      await new Users(client.user).add({
        email: 'testDb@test.test',
        password: '123456789',
        passwordConfirm: '123456789'
      });
    });

    afterAll(async () => {
      await client.user.delete({
        where: { email: 'testDb@test.test' }
      });
    });

    test('throws if options invalid', async () => {
      // @ts-ignore
      await expect(new Users(client.user).login({})).rejects.toThrow();
    });

    test('returns undefined if user does not exist', async () => {
      await expect(
        new Users(client.user).login({
          email: 'wrong@test.test',
          password: '12345678'
        })
      ).rejects.toThrow('Invalid email or password');
    });

    test('returns undefined if password is incorrect', async () => {
      await expect(
        new Users(client.user).login({
          email: 'testDb@test.test',
          password: '12345679'
        })
      ).rejects.toThrow('Invalid email or password');
    });

    test('returns token', async () => {
      const result = await new Users(client.user).login({
        email: 'testDb@test.test',
        password: '123456789'
      });
      expect(result).toStrictEqual({
        token: expect.any(String),
        expiryInDays: TOKEN_EXPIRY_DAYS
      });
    });
  });
});
