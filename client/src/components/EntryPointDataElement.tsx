/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type Props = {
  title?: string,
  data?: string,
};

class EntryPointDataElement extends React.Component<Props> {
  render() {
    return (
      <div>
        <Row>
          <Col xs={6}><b>{this.props.title}</b></Col>
        </Row>
        <Row>
          <Col xs={6}>{this.props.data}</Col>
        </Row>
      </div>
    );
  }
}

export default EntryPointDataElement;
