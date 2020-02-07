import {
  Resolver, Query, Mutation, Args, Arg, Ctx,
} from 'type-graphql';
import * as bcrypt from 'bcrypt';
import CreateUserArgs from './types/CreateUserArgs';
import User from '../../database/entity/User';
import { Context } from '../../lib/types';
import LoginArgs from './types/LoginArgs';

@Resolver()
export default class UserResolver {
  @Query((returns) => [User])
  async users(): Promise<User[] | null > {
    return User.find();
  }

  @Mutation((returns) => User)
  async createUser(@Args() { name, password, email }: CreateUserArgs): Promise<User | null> {
    const user = await User.create({
      name, password, email,
    });
    return user.save();
  }

  @Mutation((returns) => User, { nullable: true })
  async login(
    @Args() { name, password }: LoginArgs,
      @Ctx() ctx: Context,
  ): Promise<User> {
    const user = await User.findOne({ where: { name } });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw Error('non valid');
    ctx.req.session.userId = user.id;
    return user;
  }
}
