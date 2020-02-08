import { ApolloError } from 'apollo-server-express';
import {
  Resolver, Query, Ctx, Mutation, Args, Authorized,
} from 'type-graphql';
import * as bcrypt from 'bcrypt';
import { Context } from '../../lib/types';
import User from '../../database/entity/User';
import LoginArgs from './types/LoginArgs';

export const authError: ApolloError = new ApolloError('Invalid credentials');

@Resolver()
export default class AuthResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Args() { name, password }: LoginArgs,
      @Ctx() ctx: Context,
  ): Promise<User> {
    const user = await User.findOne({ where: { name } });
    if (!user) throw authError;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw authError;
    ctx.req.session.userId = user.id;
    return user;
  }

  @Authorized()
  @Query(() => User)
  async me(@Ctx() ctx: Context): Promise<User> {
    try {
      return User.findOneOrFail({ id: ctx.req.session.userId });
    } catch {
      throw authError;
    }
  }
}
