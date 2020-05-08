import { Grid, Theme, withStyles } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import Slider from '@material-ui/lab/Slider';

export interface HeaderProps {
  classes: {
    paper: string;
  };
  numRawDataPoints: number;
  numDownsampledDataPoints: number;
  onNumRawDataPointsChange: (numRawDataPoints: number) => void;
  onNumRawDataPointsConfirm: () => void;
  onNumDownsampledDataPointsChange: (numDownsampledDataPoints: number) => void;
}

const style = (theme: Theme) => ({
  paper: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
  },
});

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
      <div className={this.props.classes.paper}>
        <p>
          This is a demo playground for <a href="https://www.npmjs.com/package/downsample">downsample</a> npm module (
          <a href="https://github.com/janjakubnanista/downsample/">github</a>).
        </p>

        <Grid container spacing={16} alignItems="center">
          <Grid item xs={12} md={2}>
            {this.props.numRawDataPoints} data points
          </Grid>

          <Grid item xs={12} md={10}>
            <Slider
              min={100}
              max={5000}
              step={100}
              value={this.props.numRawDataPoints}
              onChange={this.onNumRawDataPointsChange}
              onDragEnd={this.props.onNumRawDataPointsConfirm}
            />
          </Grid>
        </Grid>

        <Grid container spacing={16} alignItems="center">
          <Grid item xs={12} md={2}>
            {this.props.numDownsampledDataPoints} downsampled data points
          </Grid>

          <Grid item xs={12} md={10}>
            <Slider
              min={10}
              max={1000}
              step={1}
              value={this.props.numDownsampledDataPoints}
              onChange={this.onNumDownsampledDataPointsChange}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(Header);
