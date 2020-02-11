import {
  Resolver, Authorized, Mutation, Args,
} from 'type-graphql';
import roles from '../../modules/constants/roles';
import User from '../../database/entity/User';
import UpdateRoleArgs from './types/UpdateRoleArgs';

@Resolver()
export default class AdminResolver {
  @Authorized([roles.admin])
  @Mutation(() => Boolean)
  async updateRole(@Args() { name, role }: UpdateRoleArgs): Promise<boolean> {
    const user = await User.findOne({ name });
    if (!user) return false;
    user.role = role;
    await user.save();

    return true;
  }
}
