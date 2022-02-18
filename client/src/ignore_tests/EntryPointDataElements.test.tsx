/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import React from 'react';
import EntryPointDataElements from '../components/EntryPointDataElements';
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

it('EntryPointDataElements render test', () => {
  act(() => {
    render(<EntryPointDataElements />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div>
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
    </div>"
  `); /* ... gets filled automatically by jest ... */
});
