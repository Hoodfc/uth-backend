import {
  Resolver, Query, Mutation, Args,
} from 'type-graphql';
import CreateUserArgs from './types/createUserArgs';
import User from '../../database/entity/User';


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
