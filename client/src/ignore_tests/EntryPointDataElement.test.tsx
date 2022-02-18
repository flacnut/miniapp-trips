/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import React from 'react';
import EntryPointDataElement from '../components/EntryPointDataElement';
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

it('EntryPointDataElement render test', () => {
  act(() => {
    render(<EntryPointDataElement />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div>
      <div class=\\"row\\">
        <div class=\\"col-6\\"><b></b></div>
      </div>
      <div class=\\"row\\">
        <div class=\\"col-6\\"></div>
      </div>
    </div>"
  `); /* ... gets filled automatically by jest ... */
});
