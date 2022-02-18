import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from "typeorm";

import { Field, ObjectType, Int } from "type-graphql";
import { Trip } from "./Trip";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  miniappsIdentifier: string;

  @Field(() => [Trip], { nullable: true })
  @ManyToMany(() => Trip, { eager: true })
  @JoinTable()
  trips: Trip[];
}