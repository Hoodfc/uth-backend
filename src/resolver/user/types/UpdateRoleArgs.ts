import { ArgsType, Field } from 'type-graphql';
import { IsIn } from 'class-validator';
import roles from '../../../lib/roles';

@ArgsType()
export default class UpdateRoleArgs {
  @Field()
  name: string;

  @Field()
  @IsIn([roles.user, roles.author, roles.admin], { message: 'Role does not exist' })
  role: string;
}
