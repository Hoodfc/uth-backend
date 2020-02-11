import { ArgsType, Field } from 'type-graphql';
import { IsEmail } from 'class-validator';

@ArgsType()
export default class ForgotPasswordArgs {
  @Field()
  @IsEmail()
  email: string;
}
