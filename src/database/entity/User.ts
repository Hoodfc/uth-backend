import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import * as bcrypt from 'bcrypt';

@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(ID)
  id!: string;

  @Column({ nullable: false, unique: true })
  @Field()
  name: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  createdAt!: Date;

  @Column()
  @Field()
  updatedAt!: Date;

  @BeforeInsert()
  async beforeInsertion(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 7);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
