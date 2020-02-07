import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class LoginArgs {
  @Field()
  name: string;

  @Field()
  password: string;
}
