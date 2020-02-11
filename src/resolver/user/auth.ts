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
  @Authorized()
  @Query(() => User)
  async me(@Ctx() ctx: Context): Promise<User> {
    try {
      return User.findOneOrFail({ id: ctx.req.session.userId });
    } catch {
      throw authError;
    }
  }

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
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<boolean> {
    return new Promise((res, rej) => ctx.req.session.destroy(
      (err) => {
        if (err) rej(Error('Something went wrong'));
        res(true);
      },
    ));
  }
}
