// @format

import { Stay } from "../entity/Stay";
import { Arg, Mutation, Resolver, Int, Query } from "type-graphql";
import Puppeteer from "puppeteer";
import { Trip } from "../entity/Trip";

@Resolver()
export class StayResolver {
  @Mutation(() => Trip)
  async createStayForTrip(
    @Arg("tripid", () => Int) tripid: number,
    @Arg("url") url: string,
  ) {
    const browser = await Puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    const titleEl = await page.$("div[data-section-id='TITLE_DEFAULT'] h1");
    const title = await page.evaluate(titleEl => titleEl.textContent, titleEl);
    const largestImage = await page.evaluate(() => {
      let tags = [].slice.call(document.getElementsByTagName('img'));
      return [...tags].sort((a, b) => b.naturalWidth * b.naturalHeight - a.naturalWidth * a.naturalHeight)[0].src;
    });

    const trip = await Trip.findOne({ id: tripid });
    const stay = await Stay.create({ imageUrl: largestImage, name: title, votes: 0 }).save();

    if (!stay || !trip) {
      return;
    }

    trip.stays = [...trip.stays, stay];
    await trip.save();
    return trip;
  }

  @Mutation(() => Stay)
  async bumpVoteCountOfStay(@Arg("stayid", () => Int) stayid: number) {
    const stay = await Stay.findOne({ id: stayid });
    if (stay) {
      stay.votes += 1;
      await stay.save();
    }
    return stay;
  }

  @Query(() => [Stay])
  async allStays() {
    return await Stay.find();
  }
}
