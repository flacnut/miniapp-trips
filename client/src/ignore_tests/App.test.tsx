/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import React from 'react';
import App from '../components/App';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
  jest.useFakeTimers();
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.useRealTimers();
});

it('App render test', () => {
  act(() => {
    render(<App />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"App\\">
      <h2>Try out the functionalities for Check-Out Flow :)</h2>
      <div>
        <h4>Your current locale is en-US</h4>
      </div><br>
      <div>
        <div>
          <div class=\\"row\\">
            <div class=\\"col-6\\"><b>Deep Link</b></div>
          </div>
          <div class=\\"row\\">
            <div class=\\"col-6\\">facebook://1234</div>
          </div>
        </div>
        <div>
          <div class=\\"row\\">
            <div class=\\"col-6\\"><b>Web URL</b></div>
          </div>
          <div class=\\"row\\">
            <div class=\\"col-6\\">https://www.facebook.com/1234</div>
          </div>
        </div>
        <div>
          <div class=\\"row\\">
            <div class=\\"col-6\\"><b>Product ID</b></div>
          </div>
          <div class=\\"row\\">
            <div class=\\"col-6\\">12345</div>
          </div>
        </div>
        <div>
          <div class=\\"row\\">
            <div class=\\"col-6\\"><b>Catalog ID</b></div>
          </div>
          <div class=\\"row\\">
            <div class=\\"col-6\\">54321</div>
          </div>
        </div>
      </div><br>
      <div>
        <div>
          <h4>This button will set cart item count to 3:</h4><button type=\\"button\\" class=\\"btn btn-primary btn-lg\\"><b>Set Cart Item Count</b></button>
        </div>
        <div>
          <h4>This button will set target url to be https://www.facebook.com/developers/:</h4><button type=\\"button\\" class=\\"btn btn-primary btn-lg\\"><b>Set Target URL</b></button>
        </div>
      </div>
    </div>"
  `); /* ... gets filled automatically by jest ... */
});
