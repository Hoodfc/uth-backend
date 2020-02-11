import BaseResolver from '../../resolver/base';
import UserResolver from '../../resolver/user';
import AuthResolver from '../../resolver/user/auth';
import AdminResolver from '../../resolver/user/admin';
import ArticleResolver from '../../resolver/article';

const User = [UserResolver, AuthResolver, AdminResolver];
const Article = [ArticleResolver];

export default [BaseResolver, ...User, Article];
