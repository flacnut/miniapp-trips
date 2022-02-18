/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Loader from './components/Loader';
import reportWebVitals from './reportWebVitals';
import {MiniAppSDKClient} from "./clients/MiniAppSDKClient";

/**
 * The main rendering function of the React app, renders the root object (App)
 */
function renderApp(): void {
  ReactDOM.render(
    <React.StrictMode>
      <Loader />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

MiniAppSDKClient.startApplet(renderApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
