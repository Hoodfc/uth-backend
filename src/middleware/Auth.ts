import { AuthChecker } from 'type-graphql';
import User from '../database/entity/User';
import Context from '../modules/types/Context';

const Auth: AuthChecker<Context> = async (
  { context },
  roles,
): Promise<boolean> => {
  const user: User | undefined = await User.findOne({
    where: { id: context.req.session.userId },
  });

  // if user is not defined
  if (!user) return false;
  // if '@Authorized()', checks is only true - assuming the user is defined
  if (roles.length === 0) return true;
  // otherwise, check if roles match
  if (roles.includes(user.role)) return true;
  return false; // or false if access is denied
};

export default Auth;
