// import { AppBar, CssBaseline, Theme, Toolbar, Typography, withStyles } from '@material-ui/core';
import { AppLayout } from './AppLayout';
import { DownsamplingMethod } from '../../types';
import { XYDataPoint } from '../../../../src/types';
import { generateRandomData } from '../utils';
import Chart from './Chart';
import Header from './Header';
import React from 'react';

export interface AppState {
  activeDownsamplingMethods: DownsamplingMethod[];
  data: XYDataPoint[];
  numRawDataPoints: number;
  numConfirmedRawDataPoints: number;
  numDownsampledDataPoints: number;
  numConfirmedDownsampledDataPoints: number;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
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
      <AppLayout>
        {/*<AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Downsample
            </Typography>
          </Toolbar>
    </AppBar>*/}

        <Header
          numRawDataPoints={this.state.numRawDataPoints}
          numDownsampledDataPoints={this.state.numDownsampledDataPoints}
          onNumRawDataPointsChange={this.onNumRawDataPointsChange}
          onNumDownsampledDataPointsChange={this.onNumDownsampledDataPointsChange}
          onNumRawDataPointsConfirm={this.onNumRawDataPointsConfirm}
        />

        <Chart
          activeDownsamplingMethods={this.state.activeDownsamplingMethods}
          data={this.state.data}
          numDownsampledDataPoints={this.state.numDownsampledDataPoints}
          onActiveDownsamplingMethodsChange={this.onActiveDownsamplingMethodsChange}
        />
      </AppLayout>
    );
  }
}

export default App;
