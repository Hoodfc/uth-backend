import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { writeFileSync } from 'fs';
import User from '../entity/User';
import roles from '../../modules/constants/roles';

define(User, (faker: typeof Faker) => {
  const name = faker.internet.userName();
  const password = faker.internet.password();
  const email = faker.internet.email(name);

  const user = new User();
  user.name = name;
  user.password = password;
  user.email = email;
  const roleIdx = Math.floor(Math.random() * 3);
  const rolesArr = [roles.user, roles.admin, roles.author];
  user.role = rolesArr[roleIdx];
  writeFileSync('src/database/logs/users.txt', `user: ${user.name}, password: ${password}, email: ${email}, role: ${user.role} \n`, { flag: 'as' });
  return user;
});
