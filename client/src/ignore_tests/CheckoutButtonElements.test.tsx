/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import React from 'react';
import CheckoutButtonElements from '../components/CheckoutButtonElements';
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

it('CheckoutButtonElements render test', () => {
  act(() => {
    render(<CheckoutButtonElements />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div>
      <div>
        <h4>This button will set cart item count to 3:</h4><button type=\\"button\\" class=\\"btn btn-primary btn-lg\\"><b>Set Cart Item Count</b></button>
      </div>
      <div>
        <h4>This button will set target url to be https://www.facebook.com/developers/:</h4><button type=\\"button\\" class=\\"btn btn-primary btn-lg\\"><b>Set Target URL</b></button>
      </div>
    </div>"
  `); /* ... gets filled automatically by jest ... */
});
