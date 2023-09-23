import { Prisma } from '@prisma/client';
import { CreateCategoryOptions } from '~/src/categories/types';
import Joi from 'joi';

const createOptionsSchema = Joi.object({
  name: Joi.string().required(),
  ownerid: Joi.string().required()
});

export class Categories {
  categoryModel: Prisma.CategoryDelegate;

  constructor(categoryModel: Prisma.CategoryDelegate) {
    if (!categoryModel) {
      throw new Error('Category model is required');
    }
    this.categoryModel = categoryModel;
  }

  async createCategory(createOptions: CreateCategoryOptions) {
    const params = await createOptionsSchema.validateAsync(createOptions);
    const candidate = await this.categoryModel.findUnique({
      where: { name: createOptions.name }
    });

    if (candidate) {
      throw new Error('Category already exist');
    }

    const category = await this.categoryModel.create({
      data: params
    });

    return category;
  }

  async getCategories(ownerid: string) {
    const categories = await this.categoryModel.findMany({
      where: { ownerid }
    });

    return categories;
  }
}
