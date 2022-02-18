/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import React from "react";
import CheckoutButtonElement from "./CheckoutButtonElement";
import {MiniAppSDKClient} from "../clients/MiniAppSDKClient";

const itemCount = 3;
const targetUrl = new URL("https://www.facebook.com/developers/");

class CheckoutButtonElements extends React.Component {
  render() {
    return (
      <div>
        <CheckoutButtonElement
        title={`This button will set cart item count to ${itemCount}:`}
        onClick={() => {
          MiniAppSDKClient.setCheckoutItemCount(itemCount);
        }}
        text={'Set Cart Item Count'} />
      <CheckoutButtonElement
        title={`This button will set target url to be ${targetUrl}:`}
        onClick={() => {
          MiniAppSDKClient.setTargetUrl(targetUrl);
        }}
        text={'Set Target URL'} />
      </div>
    );
  }
}

export default CheckoutButtonElements;
