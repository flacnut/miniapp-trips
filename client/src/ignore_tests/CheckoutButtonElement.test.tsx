/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import React from 'react';
import CheckoutButtonElement from '../components/CheckoutButtonElement';
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

it('CheckoutButtonElement render test', () => {
  act(() => {
    render(<CheckoutButtonElement />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div>
      <h4></h4><button type=\\"button\\" class=\\"btn btn-primary btn-lg\\"><b></b></button>
    </div>"
  `); /* ... gets filled automatically by jest ... */
});
