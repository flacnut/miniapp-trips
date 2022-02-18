/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import { IMiniAppSDKClient } from "./IMiniAppSDKClient";

declare global {
  interface Window {
    FBMiniapp: any;
  }
}

class MiniAppSDKClientImpl implements IMiniAppSDKClient {

  static appletSdkSrc = "https://connect.facebook.net/en_US/fbminiapp.js";

  /**
   * Inject the Applet SDK scriot node to the HTML
   * @param  {()=>void} renderApp
   */
  injectAppletSdk(renderApp: () => void) {
    var firstScript = document.getElementsByTagName("script")[0];
    if (document.getElementById("applet-js-sdk")) {
      return;
    }

    if (firstScript === null || firstScript.parentNode === null) {
      return;
    }

    firstScript.parentNode.insertBefore(this.createAppletSdkNode(renderApp), firstScript);
  }

  /**
   * Create the Applet SDK scriot node to be injected in the HTML
   * @param  {()=>void} renderApp
   */
  createAppletSdkNode(renderApp: () => void) {
    const sdk = document.createElement("script");
    sdk.id = "applet-js-sdk";
    sdk.src = MiniAppSDKClientImpl.appletSdkSrc;
    sdk.onload = () => this.initAndRenderApplet(renderApp);

    return sdk;
  }

  /**
   * Calls the Applet SDK init and start methods and renders the app as an applet
   * @param  {()=>void} renderApp
   */
  initAndRenderApplet(renderApp: () => void) {
    window.FBMiniapp.initializeAsync()
      .then(window.FBMiniapp.startAppletAsync)
      .then(renderApp)
      .catch((err: any) => {
        console.log(err);
      }
      );
  }

  /**
   * Calls the Applet SDK to get the entry point data for an applet
   */
  getEntryPointData(): any {
    return window.FBMiniapp.getEntryPointData();
  }

  /**
   * Calls the Applet SDK to set the total item count in the cart
   * @param number itemCount
   */
  setCheckoutItemCount(itemCount: number): void {
    window.FBMiniapp.setCheckoutItemCount(itemCount);
  }

  /**
   * Calls the Applet SDK to set the url that users will be taken to check out or subscribe
   * @param URL url
   */
  setTargetUrl(url: URL): void {
    window.FBMiniapp.setTargetUrl(url);
  }

  /**
   * Injects the Applets SDK script and init, starts and renders the applet
   * @param  {()=>void} renderApp
   */
  startApplet(renderApp: () => void) {
    this.injectAppletSdk(renderApp);
  }

  /**
   * Get current locale
   * @returns string that represents the current locale
  */
  getCurrentLocale(): string {
    return window.navigator.language;
  }

}

export {
  MiniAppSDKClientImpl
};
