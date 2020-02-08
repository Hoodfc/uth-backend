import { ObjectType } from 'type-graphql';
import BasePaginator from './BasePaginator';
import User from '../entity/User';

@ObjectType()
export default class UserPaginator extends BasePaginator(User) {}
