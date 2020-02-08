import {
  Resolver, Query, Mutation, Args, Ctx,
} from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import { Context } from '../../lib/types';
import CreateUserArgs from './types/CreateUserArgs';
import User from '../../database/entity/User';

export const createUserError = new ApolloError('Something went wrong while creating the user');
export const updateUserError = new ApolloError('Something went wrong while updating the user');

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[] | null > {
    return User.find();
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
