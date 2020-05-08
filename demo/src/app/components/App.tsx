import { AppBar, CssBaseline, Theme, Toolbar, Typography, withStyles } from '@material-ui/core';
import { DownsamplingMethod } from '../../types';
import { XYDataPoint } from '../../../../src/types';
import { generateRandomData } from '../utils';
import Chart from './Chart';
import Header from './Header';
import React from 'react';

const style = (theme: Theme) => ({
  chart: {
    padding: theme.spacing.unit * 2,
  },
});

export interface AppProps {
  classes: {
    chart: string;
  };
}

export interface AppState {
  activeDownsamplingMethods: DownsamplingMethod[];
  data: XYDataPoint[];
  numRawDataPoints: number;
  numConfirmedRawDataPoints: number;
  numDownsampledDataPoints: number;
  numConfirmedDownsampledDataPoints: number;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      activeDownsamplingMethods: [DownsamplingMethod.LTD, DownsamplingMethod.LTOB, DownsamplingMethod.LTTB],
      numRawDataPoints: 1000,
      numConfirmedRawDataPoints: 1000,
      numDownsampledDataPoints: 100,
      numConfirmedDownsampledDataPoints: 100,
      data: generateRandomData(1000),
    };
  }

  private onActiveDownsamplingMethodsChange = (activeDownsamplingMethods: DownsamplingMethod[]) =>
    this.setState({ activeDownsamplingMethods });

  private onNumRawDataPointsChange = (numRawDataPoints: number): void => this.setState(() => ({ numRawDataPoints }));

  private onNumRawDataPointsConfirm = (): void => {
    const numConfirmedRawDataPoints = this.state.numRawDataPoints;
    const data: XYDataPoint[] = generateRandomData(numConfirmedRawDataPoints);

    this.setState(() => ({ data, numConfirmedRawDataPoints }));
  };

  private onNumDownsampledDataPointsChange = (numDownsampledDataPoints: number): void =>
    this.setState({ numDownsampledDataPoints });

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <CssBaseline />

        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Downsample
            </Typography>
          </Toolbar>
        </AppBar>

        <Typography component="div">
          <Header
            numRawDataPoints={this.state.numRawDataPoints}
            numDownsampledDataPoints={this.state.numDownsampledDataPoints}
            onNumRawDataPointsChange={this.onNumRawDataPointsChange}
            onNumDownsampledDataPointsChange={this.onNumDownsampledDataPointsChange}
            onNumRawDataPointsConfirm={this.onNumRawDataPointsConfirm}
          />

          <div className={this.props.classes.chart}>
            <Chart
              activeDownsamplingMethods={this.state.activeDownsamplingMethods}
              data={this.state.data}
              numDownsampledDataPoints={this.state.numDownsampledDataPoints}
              onActiveDownsamplingMethodsChange={this.onActiveDownsamplingMethodsChange}
            />
          </div>
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(App);
