import { ApolloError } from 'apollo-server-express';
import {
  Resolver, Query, Ctx, Mutation, Args, Authorized,
} from 'type-graphql';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import Context from '../../modules/types/Context';
import User from '../../database/entity/User';
import LoginArgs from './types/LoginArgs';
import redis from '../../modules/server/redis';
import sendEmail from '../../modules/utils/sendEmail';
import { forgotPassword } from '../../modules/constants/redisPrefixes';
import ForgotPasswordArgs from './types/ForgotPasswordArgs';

export const authError: ApolloError = new ApolloError('Invalid credentials');
export const userNotFound: ApolloError = new ApolloError('User was not found');

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
        if (err) return rej(Error('Something went wrong'));
        ctx.res.clearCookie('sid');
        return res(true);
      },
    ));
  }

  @Query(() => Boolean)
  async forgotPassword(@Args() { email }: ForgotPasswordArgs): Promise<boolean> {
    const user = await User.findOne({ email });
    if (!user) throw userNotFound;

    const token = v4();
    await redis.set(forgotPassword + token, user.id, 'ex', 60 * 60 * 24);

    await sendEmail(user.email, `http://localhost:3000/user/change-password/${token}`);

    return true;
  }
}
