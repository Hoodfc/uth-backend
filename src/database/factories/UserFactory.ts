import Faker from 'faker';
import { define } from 'typeorm-seeding';
import User from '../entity/User';
import roles from '../../modules/constants/roles';
import writeLog from '../logs/writeLog';

interface UserSettings {
  role?: string;
}

define(User, (faker: typeof Faker, settings: UserSettings) => {
  const name = faker.internet.userName();
  const password = faker.internet.password();
  const email = faker.internet.email(name);

  const user = new User();
  user.name = name;
  user.password = password;
  user.email = email;
  const roleIdx = Math.floor(Math.random() * 3);
  const rolesArr = [roles.user, roles.admin, roles.author];
  if (settings && settings.role) {
    user.role = settings.role;
  } else {
    user.role = rolesArr[roleIdx];
  }
  // user.role = settings.role || rolesArr[roleIdx];
  writeLog('user', `user: ${user.name}, password: ${password}, email: ${email}, role: ${user.role} \n`);
  return user;
});
