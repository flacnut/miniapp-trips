import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { Trip } from "./Trip";

@Entity()
@ObjectType()
export class Stay extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  imageUrl: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  votes: number;

  @Field(() => Trip)
  @ManyToOne(() => Trip, trip => trip.stays)
  trip: Trip;
}