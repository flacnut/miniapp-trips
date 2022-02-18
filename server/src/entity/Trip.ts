import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { Stay } from "./Stay";

@Entity()
@ObjectType()
export class Trip extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  inviteCode: string;

  @Field()
  @Column()
  to: string;

  @Field()
  @Column()
  from: string;

  @Field()
  @Column()
  location: string;

  @Field(() => [Stay])
  @OneToMany(() => Stay, stay => stay.trip, { eager: true })
  stays: Stay[];
}