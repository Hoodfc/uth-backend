import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsDate } from 'class-validator';
import roles from '../../lib/roles';

@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(ID)
  id!: string;

  @Column({ nullable: false, unique: true })
  @Field()
  name: string;

  @Column({ nullable: false, unique: true })
  @Field()
  password: string;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  @Field()
  email: string;

  @Column({ type: 'enum', enum: roles, default: roles.user })
  @Field()
  role: string;

  @Column()
  @IsDate()
  @Field()
  createdAt: Date;

  @Column()
  @IsDate()
  @Field()
  updatedAt: Date;

  @BeforeInsert()
  async beforeInsertion(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 7);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
