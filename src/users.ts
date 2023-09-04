import { Prisma, PrismaClient, User } from '@prisma/client';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

export const TOKEN_EXPIRY_DAYS = 7;

export interface UsersAddOption {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface UsersLoginOption {
  email: string;
  password: string;
}

export interface UsersToken {
  token: string;
  expiryInDays: number;
}

const userAddOptionsSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).required(),
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required()
}).required();

const userLoginOptionsSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).required()
}).required();

export class Users {
  UserModel: Prisma.UserDelegate;
  constructor(UserModel: Prisma.UserDelegate) {
    if (!UserModel) {
      throw new Error('UserModel is  required');
    }
    this.UserModel = UserModel;
  }

  static async hashPassword(str: string) {
    return await bcrypt.hash(str, 5);
  }

  static async isValidPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  static createToken(user: User): UsersToken {
    const { id, email } = user;
    const token = JWT.sign(
      { id, email },
      process.env.JWT_TOKEN_SECRET as string,
      {
        expiresIn: `${TOKEN_EXPIRY_DAYS}d`
      }
    );
    return {
      token,
      expiryInDays: TOKEN_EXPIRY_DAYS
    };
  }

  static getUserInfoFromToken(
    token: string
  ): { id: string; email: string } | undefined {
    try {
      const { id, email } = <{ id: string; email: string }>(
        JWT.verify(token, process.env.JWT_TOKEN_SECRET as string)
      );
      return { id, email };
    } catch (e) {
      return;
    }
  }

  async add(options: UsersAddOption): Promise<Omit<User, 'password'>> {
    const params = (await userAddOptionsSchema.validateAsync(
      options
    )) as UsersAddOption;

    const user = await this.UserModel.findUnique({
      where: { email: params.email }
    });

    if (user) {
      throw new Error('User Already exists');
    }

    const hashPassword = await Users.hashPassword(params.password);

    return this.UserModel.create({
      data: {
        email: params.email,
        password: hashPassword
      },
      select: {
        email: true,
        id: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async login(options: UsersLoginOption): Promise<UsersToken | undefined> {
    const params = (await userLoginOptionsSchema.validateAsync(
      options
    )) as UsersLoginOption;

    const user = await this.UserModel.findUnique({
      where: {
        email: params.email
      }
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!(await Users.isValidPassword(params.password, user.password))) {
      throw new Error('Invalid email or password');
    }

    return Users.createToken(user);
  }
}
