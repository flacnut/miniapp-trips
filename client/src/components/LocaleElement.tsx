/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

 import React from "react";
 import {MiniAppSDKClient} from "../clients/MiniAppSDKClient";

 class LocaleElement extends React.Component {
   render() {
     const language = MiniAppSDKClient.getcurrentLocale();
     return (
       <div>
         <h4>Your current locale is {language}</h4>
       </div>
     );
   }
 }

 export default LocaleElement;
