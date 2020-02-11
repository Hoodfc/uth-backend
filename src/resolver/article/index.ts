import {
  Resolver, Query, Mutation, Args, Authorized, Ctx,
} from 'type-graphql';
import Article from '../../database/entity/Article';
import CreateArticleArgs from './types/CreateArticleArgs';
import roles from '../../modules/constants/roles';
import User from '../../database/entity/User';
import Context from '../../modules/types/Context';
import PaginationArgs from '../types/PaginationArgs';
import ArticlePaginator from '../../database/schema/ArticlePaginator';
import pagination from '../../modules/utils/pagination';

@Resolver()
export default class ArticleResolver {
  @Query(() => ArticlePaginator)
  async articles(@Args() { take, skip }: PaginationArgs): Promise<ArticlePaginator> {
    const articles = await Article.findAndCount({ relations: ['author'], skip, take });
    const items: Article[] = [...articles[0]];
    const total: number = articles[1];
    return {
      hasMore: pagination.hasMore(total, skip, take),
      items,
      total,
      page: pagination.page(skip, take),
    };
  }

  @Authorized([roles.author, roles.admin])
  @Mutation(() => Article)
  async createArticle(
    @Args() { title, content }: CreateArticleArgs,
      @Ctx() ctx: Context,
  ): Promise<Article> {
    const author = await User.findOne({ id: ctx.req.session.userId });
    if (!author) throw Error();

    const article = await Article.create({ title, content });
    article.author = author;

    return article.save();
  }
}
