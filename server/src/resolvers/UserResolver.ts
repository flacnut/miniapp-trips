import { User } from "../entity/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("miniappsIdentifier") miniappsIdentifier: string) {
    const existingUser = await User.find({ miniappsIdentifier });

    if (existingUser) {
      return existingUser;
    }

    return await User.create({ miniappsIdentifier }).save();
  }

  @Query(() => [User])
  async users() {
    return await User.find();
  }

  @Query(() => User)
  async user(@Arg("miniappsIdentifier") miniappsIdentifier: string) {
    const existingUser =  await User.findOne({ miniappsIdentifier });

    if (existingUser) {
      console.dir(existingUser);
      return existingUser;
    }

    await User.create({ miniappsIdentifier }).save();
    return await User.findOne({ miniappsIdentifier });
  }
}
