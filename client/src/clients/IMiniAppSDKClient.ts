/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

export interface IMiniAppSDKClient {
    getEntryPointData:()=>any,
    setCheckoutItemCount:(itemCount: number)=>void,
    setTargetUrl:(urtl: URL)=>void,
    startApplet:(renderApp: () => void)=>void,
    getCurrentLocale:()=>string,
 }
