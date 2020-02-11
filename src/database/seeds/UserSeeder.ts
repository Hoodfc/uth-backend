import { Factory, Seeder } from 'typeorm-seeding';
import User from '../entity/User';

export default class UserSeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().seedMany(10);
  }
}
