import { Seeder, Factory, times } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import User from '../entity/User';
import Article from '../entity/Article';
import writeLog from '../logs/writeLog';

export default class ArticleSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    // const connection = await factory.getConnection();
    const em = connection.createEntityManager();
    const author = await factory(User)({ role: 'author' }).seed();
    writeLog('author', `name: ${author.name}, password: ${author.password}, email: ${author.email}`);
    await times(10, async () => {
      // This creates a pet in the database
      // This only returns a entity with fake data
      const article = await factory(Article)().make();
      article.author = author;
      await em.save(article);
    });
  }
}
