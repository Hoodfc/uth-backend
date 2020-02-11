import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class CreateArticleArgs {
  @Field()
  title: string;

  @Field()
  content: string;
}
