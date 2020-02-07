import {
  Resolver, Query, Mutation, Args,
} from 'type-graphql';
import User from '../../entity/User';
import CreateUserArgs from './types/createUserArgs';


@Resolver()
export default class UserResolver {
  @Query((returns) => [User])
  async users(): Promise<User[] | null > {
    return User.find();
  }

  @Mutation((returns) => User)
  async createUser(@Args() { name, password }: CreateUserArgs): Promise<User | null> {
    const user = await User.create({
      name, password,
    });
    return user.save();
  }
}
