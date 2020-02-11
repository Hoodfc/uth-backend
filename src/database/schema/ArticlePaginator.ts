import { ObjectType } from 'type-graphql';
import BasePaginator from './BasePaginator';
import Article from '../entity/Article';

@ObjectType()
export default class ArticlePaginator extends BasePaginator(Article) {}
