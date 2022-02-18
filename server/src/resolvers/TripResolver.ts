// @format

import { User } from "../entity/User";
import { Trip } from "../entity/Trip";
import { Arg, Mutation, Resolver, Int, InputType, Field, Query } from "type-graphql";


@InputType()
class TripInputs {
  @Field()
  to: string;

  @Field()
  from: string;

  @Field()
  location: string;
}

@Resolver()
export class TripResolver {
  @Mutation(() => User)
  async createTripForUser(
    @Arg("userid", () => Int) userid: number,
    @Arg("options", () => TripInputs) options: TripInputs
  ) {
    const token = (Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5)).toUpperCase();
    const trip = await Trip.create({ inviteCode: token, ...options }).save();
    const user = await User.findOne({ id: userid });

    if (!user || !trip) {
      return null;
    }

    user.trips = [...user.trips || [], trip];
    await user.save();
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async joinTripForUser(
    @Arg("userid", () => Int) userid: number,
    @Arg("inviteCode") inviteCode: string) {
    const user = await User.findOne({ id: userid });
    const trip = await Trip.findOne({ inviteCode });

    if (!user || !trip) {
      return null;
    }

    user.trips = [...user.trips || [], trip];
    await user.save();

    return user;
  }

  @Query(() => [Trip])
  async allTrips() {
    return await Trip.find();
  }

}
