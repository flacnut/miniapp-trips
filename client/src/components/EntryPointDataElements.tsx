/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import React from "react";
import EntryPointDataElement from "./EntryPointDataElement";
import {MiniAppSDKClient} from "../clients/MiniAppSDKClient";

const DeepLink = 'Deep Link';
const WebURL = 'Web URL';
const ProductID = 'Product ID';
const CatalogID = 'Catalog ID';

class EntryPointDataElements extends React.Component {
  entryPointData = MiniAppSDKClient.getEntryPointData();
  deepLinkData = this.entryPointData?.fb_applet_product_deeplink?.toString() ?? '';
  webUrlData = this.entryPointData?.fb_applet_product_web_url?.toString() ?? '';
  productIdData = this.entryPointData?.fb_applet_product_id?.toString() ?? '';
  catalogIdData = this.entryPointData?.fb_applet_catalog_id?.toString() ?? '';

  render() {
    return (
      <div>
        <EntryPointDataElement title={DeepLink} data={this.deepLinkData} />
        <EntryPointDataElement title={WebURL} data={this.webUrlData} />
        <EntryPointDataElement title={ProductID} data={this.productIdData} />
        <EntryPointDataElement title={CatalogID} data={this.catalogIdData} />
      </div>
    );
  }
}

export default EntryPointDataElements;
