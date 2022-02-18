/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import { IMiniAppSDKClient } from "./IMiniAppSDKClient";


class MiniAppSDKClientMock implements IMiniAppSDKClient {
  /**
   * Calls the Applet SDK to get the entry point data for an applet
   */
  // TODO T93809507: Add typing for entry point data
  getEntryPointData(): any {
    return {
      fb_applet_product_deeplink: 'facebook://1234',
      fb_applet_product_web_url: 'https://www.facebook.com/1234',
      fb_applet_product_id: '12345',
      fb_applet_catalog_id: '54321',
    }
  }

  /**
   * Calls the Applet SDK to set the total item count in the cart
   * @param number itemCount
   */
  setCheckoutItemCount(itemCount: number): void {
    return;
  }

  /**
   * Calls the Applet SDK to set the url that users will be taken to check out or subscribe
   * @param URL url
   */
  setTargetUrl(url: URL): void {
    return;
  }

  /**
   * Injects the Applets SDK script and init, starts and renders the applet
   * @param  {()=>void} renderApp
   */
  startApplet(renderApp: () => void): void {
    renderApp();
  }

  /**
   * Get current locale
   * @returns string that represents the current locale
   */
  getCurrentLocale():string{
    return window.navigator.language;
  }
}

export {
  MiniAppSDKClientMock
};
