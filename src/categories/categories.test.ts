import { Users } from '../users/users';
import { PrismaClient } from '@prisma/client';
import { Categories } from './categories';

const client = new PrismaClient();

describe('Categories tests', () => {
  let id = '';

  beforeAll(async () => {
    const { token } = await new Users(client.user).add({
      email: 'testDb3@test.test',
      password: '123456789',
      passwordConfirm: '123456789'
    });

    const userData = Users.getUserInfoFromToken(token);
    id = userData?.id as string;
  });

  afterAll(async () => {
    await client.user.delete({
      where: { email: 'testDb3@test.test' }
    });
  });

  test('throws if constructor options are invalid');
  // @ts-ignore
  expect(() => new Categories()).throws();

  test('define todosModel', () => {
    const categories = new Categories(client.category);

    expect(categories.categoryModel).toBeDefined();
  });

  describe('createCategory tests', () => {
    const categoriesController = new Categories(client.category);
    test('should throw if no category name', async () => {
      // @ts-ignore
      await expect(categoriesController.createCategory({})).rejects.toThrow(
        '"name" is required'
      );
    });

    test('should throw if category name is not string', async () => {
      await expect(
        // @ts-ignore
        categoriesController.createCategory({ name: 123 })
      ).rejects.toThrow('"name" must be a string');
    });

    test('should throw if no ownerid', async () => {
      await expect(
        // @ts-ignore
        categoriesController.createCategory({ name: 'test category' })
      ).rejects.toThrow('"ownerid" is required');
    });

    test('should throw if ownerid is not string', async () => {
      await expect(
        categoriesController.createCategory({
          name: 'test category',
          // @ts-ignore
          ownerid: 123
        })
      ).rejects.toThrow('"ownerid" must be a string');
    });

    test('should create a category successfully', async () => {
      const category = await categoriesController.createCategory({
        name: 'test category',
        ownerid: id
      });

      expect(category).toStrictEqual({
        id: expect.any(String),
        name: 'test category',
        ownerid: id
      });

      await client.category.delete({
        where: { id: category.id }
      });
    });

    test('should throw if category already exist', async () => {
      const category = await categoriesController.createCategory({
        name: 'test category',
        ownerid: id
      });

      await expect(
        categoriesController.createCategory({
          name: 'test category',
          ownerid: id
        })
      ).rejects.toThrow('Category already exist');

      await client.category.delete({
        where: { id: category.id }
      });
    });
  });

  test('it should return categories', async () => {
    const categoriesController = new Categories(client.category);
    const category = await categoriesController.createCategory({
      name: 'test category',
      ownerid: id
    });

    const categories = await categoriesController.getCategories(id);

    expect(categories).toStrictEqual([category]);

    await client.category.delete({
      where: { id: category.id }
    });
  });
});
