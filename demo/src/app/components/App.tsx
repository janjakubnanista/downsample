import React from "react";
import { AppBar, Toolbar, Typography, CssBaseline } from "@material-ui/core";
import { generateRandomData } from "../utils";
import Header from "./Header";
import { DataPoint, XYDataPoint } from "../../../../src/types";
import Chart from "./Chart";

export interface AppProps {}

export interface AppState {
  data: XYDataPoint[];
  numRawDataPoints: number;
  numConfirmedRawDataPoints: number;
  numDownsampledDataPoints: number;
  numConfirmedDownsampledDataPoints: number;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      numRawDataPoints: 1000,
      numConfirmedRawDataPoints: 1000,
      numDownsampledDataPoints: 100,
      numConfirmedDownsampledDataPoints: 100,
      data: generateRandomData(1000)
    };
  }

  private onNumRawDataPointsChange = (numRawDataPoints: number): void => {


    this.setState(() => ({ numRawDataPoints }));
  }

  private onNumRawDataPointsConfirm = (): void => {
    const numConfirmedRawDataPoints = this.state.numRawDataPoints;
    const data: XYDataPoint[] = generateRandomData(numConfirmedRawDataPoints);

    this.setState(() => ({ data, numConfirmedRawDataPoints }));
  }

  private onNumDownsampledDataPointsChange = (numDownsampledDataPoints: number): void => this.setState({ numDownsampledDataPoints });

  render(): React.ReactNode {
    return <React.Fragment>
      <CssBaseline/>

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

        <Chart data={this.state.data} numDownsampledDataPoints={this.state.numDownsampledDataPoints}/>
      </Typography>
    </React.Fragment>;
  }
}