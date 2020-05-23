// import { Grid, Theme, withStyles } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
// import Slider from '@material-ui/lab/Slider';
import { Col, Row } from 'react-grid-system';

export interface HeaderProps {
  numRawDataPoints: number;
  numDownsampledDataPoints: number;
  onNumRawDataPointsChange: (numRawDataPoints: number) => void;
  onNumRawDataPointsConfirm: () => void;
  onNumDownsampledDataPointsChange: (numDownsampledDataPoints: number) => void;
}

class Header extends React.PureComponent<HeaderProps> {
  private onNumRawDataPointsChange = (event: ChangeEvent<HTMLSelectElement>, numRawDataPoints: number): void => {
    this.props.onNumRawDataPointsChange(numRawDataPoints);
  };

  private onNumDownsampledDataPointsChange = (
    event: ChangeEvent<HTMLSelectElement>,
    numDownsampledDataPoints: number,
  ): void => {
    this.props.onNumDownsampledDataPointsChange(numDownsampledDataPoints);
  };

  render(): React.ReactNode {
    return (
      <div>
        <p>
          This is a demo playground for <a href="https://www.npmjs.com/package/downsample">downsample</a> npm module (
          <a href="https://github.com/janjakubnanista/downsample/">github</a>).
        </p>

        <Row align="center">
          <Col xs={12} md={2}>
            {this.props.numRawDataPoints} data points
          </Col>

          <Col xs={12} md={10}></Col>
        </Row>

        <Row align="center">
          <Col xs={12} md={2}>
            {this.props.numDownsampledDataPoints} downsampled data points
          </Col>

          <Col xs={12} md={10}></Col>
        </Row>
      </div>
    );
  }
}

export default Header;
