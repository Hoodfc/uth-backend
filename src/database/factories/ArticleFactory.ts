import Faker from 'faker';
import { define } from 'typeorm-seeding';
import Article from '../entity/Article';
import writeLog from '../logs/writeLog';

define(Article, (faker: typeof Faker) => {
  const title = faker.lorem.sentence();
  const content = faker.lorem.sentences(10);

  const article = new Article();
  article.title = title;
  article.content = content;
  writeLog('article', `title: ${title} \n`);
  return article;
});
