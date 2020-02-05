import { Resolver, Query } from 'type-graphql';

@Resolver()
export default class BaseResolver {
  @Query((returns) => String)
  hi(): string {
    return 'hello world';
  }
}
