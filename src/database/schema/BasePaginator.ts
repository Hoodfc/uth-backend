import {
  ClassType, Field, ObjectType, Int,
} from 'type-graphql';

export default function BasePaginator<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class BasePaginatorClass {
    @Field(() => [TItemClass])
    items: TItem[];

    @Field(() => Int)
    total: number;

    @Field()
    hasMore: boolean;

    @Field(() => Int)
    page: number
  }
  return BasePaginatorClass;
}
