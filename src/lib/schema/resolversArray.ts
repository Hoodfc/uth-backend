import BaseResolver from '../../resolver/base';
import UserResolver from '../../resolver/user';
import AuthResolver from '../../resolver/user/auth';

const User = [UserResolver, AuthResolver];

export default [BaseResolver, ...User];
