import {
  Resolver, Query, Mutation, Args, Ctx, Arg,
} from 'type-graphql';

import { ApolloError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import { forgotPassword } from '../../modules/constants/redisPrefixes';
import Context from '../../modules/types/Context';
import CreateUserArgs from './types/CreateUserArgs';
import User from '../../database/entity/User';
import PaginationArgs from '../types/PaginationArgs';
import UserPaginator from '../../database/schema/UserPaginator';
import redis from '../../modules/server/redis';


export const createUserError = new ApolloError('Something went wrong while creating the user');
export const updateUserError = new ApolloError('Something went wrong while updating the user');
export const wrongTokenError = new ApolloError('Could not find the token');
export const userNotFound = new ApolloError('The user was not found');

@Resolver()
export default class UserResolver {
  @Query(() => UserPaginator)
  async users(@Args() { take, skip }: PaginationArgs): Promise<UserPaginator> {
    const users = await User.findAndCount({ take, skip });
    const total = users[1];
    return {
      hasMore: (total - (skip + take)) > 0,
      items: [...users[0]],
      total,
      page: (skip / take) + 1,
    };
  }

  @Mutation(() => User)
  async createUser(@Args() { name, password, email }: CreateUserArgs): Promise<User | null> {
    try {
      const user = await User.create({
        name, password, email,
      });
      return user.save();
    } catch {
      throw createUserError;
    }
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Args() { name, password, email }: CreateUserArgs,
      @Ctx() ctx: Context,
  ): Promise<boolean> {
    const id = ctx.req.session.userId || undefined;
    if (!id) throw Error;
    const user = await User.findOne({ id });
    if (!user) throw updateUserError;
    try {
      await User.update({ id }, { name, password, email });
      return true;
    } catch {
      throw updateUserError;
    }
  }

  @Mutation(() => User)
  async changePassword(@Arg('token') token: string, @Arg('password') password: string): Promise<User> {
    const redisToken = forgotPassword + token;

    const userId = await redis.get(redisToken);
    if (!userId) throw wrongTokenError;

    const user = await User.findOne({ id: userId });
    if (!user) throw userNotFound;
    await redis.del(redisToken);

    user.password = await bcrypt.hash(password, 7);

    return user.save();
  }
}
