import {
  ObjectType,
  Resolver, Query, Mutation, Args, Ctx,
} from 'type-graphql';

import { ApolloError } from 'apollo-server-express';
import { Context } from '../../lib/types';
import CreateUserArgs from './types/CreateUserArgs';
import User from '../../database/entity/User';
import PaginationArgs from '../types/PaginationArgs';
// import BasePaginator from '../../database/schema/BasePaginator';
import UserPaginator from '../../database/schema/UserPaginator';

// @ObjectType()
// export class UserPaginator extends BasePaginator(User) {}


export const createUserError = new ApolloError('Something went wrong while creating the user');
export const updateUserError = new ApolloError('Something went wrong while updating the user');

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
}
