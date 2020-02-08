import { ApolloError } from 'apollo-server-express';
import {
  Resolver, Query, Ctx, Mutation, Args,
} from 'type-graphql';
import * as bcrypt from 'bcrypt';
import { Context } from '../../lib/types';
import User from '../../database/entity/User';
import LoginArgs from './types/LoginArgs';

export const authError: ApolloError = new ApolloError('Invalid credentials');

@Resolver()
export default class AuthResolver {
  @Mutation((returns) => User, { nullable: true })
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

  @Query((returns) => User)
  async me(@Ctx() ctx: Context): Promise<User> {
    if (!ctx.req.session.userId) throw authError;
    try {
      return User.findOneOrFail({ id: ctx.req.session.userId });
    } catch {
      throw authError;
    }
  }
}
