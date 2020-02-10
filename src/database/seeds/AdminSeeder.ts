import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import User from '../entity/User';
import roles from '../../lib/roles';


export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const password = await bcrypt.hash('root', 7);
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{
        name: 'hoodfc', email: 'hoodfc@gmail.com', password, role: roles.admin, createdAt: new Date(), updatedAt: new Date(),
      }])
      .execute();
  }
}
