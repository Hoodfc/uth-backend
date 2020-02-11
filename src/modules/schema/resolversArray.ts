import BaseResolver from '../../resolver/base';
import UserResolver from '../../resolver/user';
import AuthResolver from '../../resolver/user/auth';
import AdminResolver from '../../resolver/user/admin';

const User = [UserResolver, AuthResolver, AdminResolver];

export default [BaseResolver, ...User];
