import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { writeFileSync } from 'fs';
import User from '../entity/User';

define(User, (faker: typeof Faker) => {
  const name = faker.internet.userName();
  const password = faker.internet.password();
  const email = faker.internet.email(name);

  const user = new User();
  user.name = name;
  user.password = password;
  user.email = email;
  console.log(user);
  writeFileSync('src/database/logs/users.txt', `user: ${user.name}, password: ${password}, email: ${email} \n`, { flag: 'as' });
  return user;
});
