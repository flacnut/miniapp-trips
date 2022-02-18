/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import { Button } from "@material-ui/core";

type Props = {
  title?: string,
  onClick?: () => void,
  text?: String
};

export default function CheckoutButtonElement(props: Props) {
  return (
    <div>
      <h4>{props.title}</h4>
      <Button
        variant="outlined"
        onClick={props.onClick}
      >
        <b>{props.text}</b>
      </Button>
    </div>
  );
}
