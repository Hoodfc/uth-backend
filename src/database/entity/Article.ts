import { IsDate } from 'class-validator';
import {
  Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import User from './User';
import slugify from '../../modules/utils/slugify';

@Entity()
@ObjectType()
export default class Article extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  content: string;

  @Column({ unique: true })
  @Field()
  slug: string;

  @ManyToOne('User', 'articles')
  @Field(() => User)
  author: User;

  @Column({ default: new Date() })
  @IsDate()
  @Field()
  createdAt: Date;

  @Column({ default: new Date() })
  @IsDate()
  @Field()
  updatedAt: Date;

  @BeforeInsert()
  async slugifyTitle(): Promise<void> {
    this.slug = slugify(this.title);
  }
}
