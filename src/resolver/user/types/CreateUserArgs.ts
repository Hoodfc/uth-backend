import { IsEmail } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class CreateUserArgs {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: false })
  @IsEmail()
  email: string;
}
