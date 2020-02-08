import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class PaginationArgs {
  @Field()
  take: number;

  @Field()
  skip: number;
}
