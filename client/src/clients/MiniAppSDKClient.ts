/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import { IMiniAppSDKClient } from './IMiniAppSDKClient';
import { MiniAppSDKClientMock } from "./MiniAppSDKClientMock";
import { MiniAppSDKClientImpl } from "./MiniAppSDKClientImpl";
import configData from "../config.json";
//import { isTestRun } from "../tests/testingUtils"

class MiniAppSDKClient {
  private static _miniAppSDKClient: IMiniAppSDKClient = (configData.mockMiniAppSDK) ? new MiniAppSDKClientMock() : new MiniAppSDKClientImpl();

  /**
  * Calls the Applet SDK to get the entry point data for an applet
  */
  static getEntryPointData(): any {
    return this._miniAppSDKClient.getEntryPointData();
  }

  /**
   * Calls the Applet SDK to set the total item count in the cart
   * @param number itemCount
   */
  static setCheckoutItemCount(itemCount: number): void {
    return this._miniAppSDKClient.setCheckoutItemCount(itemCount);
  }

  /**
   * Calls the Applet SDK to set the url that users will be taken to check out or subscribe
   * @param URL url
   */
  static setTargetUrl(url: URL): void {
    return this._miniAppSDKClient.setTargetUrl(url);
  }

  /**
   * Injects the Applets SDK script and init, starts and renders the applet
   * @param  {()=>void} renderApp
   */
  static startApplet(renderApp: () => void) {
    return this._miniAppSDKClient.startApplet(renderApp);
  }

  /**
   * Get current locale
   * @returns string that represents the current locale
   */
  static getcurrentLocale(): string {
    return this._miniAppSDKClient.getCurrentLocale();
  }
}

export { MiniAppSDKClient };
