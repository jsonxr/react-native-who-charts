import React from 'react';
import { processColor } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';
import whoData from './boys-weight';

const defaultPercentiles = [
  'P1',
  'P3',
  'P5',
  'P10',
  'P15',
  'P25',
  'P50',
  'P75',
  'P85',
  'P90',
  'P95',
  'P97',
  'P99',
];

const styles = {
  P3: {
    color: processColor('green'),
    lineWidth: 2,
  },
  P50: {
    //color: processColor('green'),
    lineWidth: 2,
  },
  P97: {
    //color: processColor('yellow'),
    lineWidth: 2,
  },
};

const percentileChartConfig = setName => {
  const overrides = styles[setName] ? styles[setName] : {};

  return {
    drawCircles: false,
    drawValues: false,
    circleColor: processColor(red),
    ...overrides,
  };
};

const subjectChartConfig = {
  //mode: 'CUBIC_BEZIER',
  drawValues: true,
  //lineWidth: 2,
  drawCircles: true,
  circleColor: processColor('green'),
  color: processColor('black'),
  drawCircleHole: false,
  circleRadius: 5,
  highlightColor: processColor('transparent'),
  drawFilled: true,
  fillGradient: {
    colors: [processColor('white'), processColor('red')],
    positions: [0, 0.5],
    angle: 90,
    orientation: 'TOP_BOTTOM',
  },
  fillAlpha: 1000,
  valueTextColor: processColor('green'),
  valueTextSize: 24,
};

console.log('\n\n\n\n----------------------------');
console.log(
  whoData['P3'].map(value => ({
    y: value,
    marker: `${value}`,
  })),
);
console.log('----------------------------\n\n\n\n');

const createDataSets = (percentiles = defaultPercentiles) => {
  const dataSets = Object.keys(whoData)
    .filter(k => percentiles.indexOf(k) > -1)
    .map(k => ({
      label: k,
      values: whoData[k].map(value => ({
        marker: `${value}`,
        y: value,
      })),
      config: percentileChartConfig(k),
    }));

  return dataSets;
};

const createMergeDataSets = (subject, percentiles = defaultPercentiles) => {
  const dataSets = createDataSets(percentiles);
  const subjectDataSet = {
    label: subject.label,
    values: subject.values,
    config: {
      ...subjectChartConfig,
    },
  };
  dataSets.unshift(subjectDataSet);
  return dataSets;
};

const red = 'rgb(250, 2, 1)';
const greenBlue = 'rgb(26, 182, 151)';
const petrel = 'rgb(59, 145, 153)';

const dataSets = createMergeDataSets(
  {
    label: 'subject',
    values: [
      // { x: 0, y: 3.3 },
      // { x: 1, y: 3.3 },
      // { x: 2, y: 5.0 },
      // { x: 3, y: 6.3 },
      { x: 4, y: 6.9, marker: '6.9kg birth' },
      //{ x: 5, y: 7.4 },
      { x: 6, y: 7.8, marker: '7.8kg' },
      { x: 7, y: 8.2, marker: '8.2kg' },
      { x: 8, y: 9, marker: '9kg' },
    ],
  },
  ['P3', 'P25', 'P50', 'P75', 'P97'],
);

const data = {
  labels: ['a', 'b'],
  dataSets: dataSets,
};

const marker = {
  enabled: false,
  digits: 2,
  backgroundTint: processColor('green'),
  markerColor: processColor('red'),
  textColor: processColor('white'),
  markerFontSize: 62,
};

const legend = {
  enabled: true,
  textColor: processColor('gray'),
  textSize: 14,
  //form: 'SQUARE',
  formSize: 14,
  xEntrySpace: 10,
  yEntrySpace: 0,
  formToTextSpace: 5,
  wordWrapEnabled: false,
  maxSizePercent: 0.5,
  // custom: {
  //   colors: [processColor('red'), processColor('blue')],
  //   labels: ['3%', '25%', '50%', '75%', '97%', 'subject'],
  // },
};

const visibleMonthStart = 4;
const visibleRange = {
  x: { min: visibleMonthStart, max: visibleMonthStart + 6 },
  y: { min: 2, max: 16 },
};
const yAxis = {
  left: {
    enabled: true,
    granularity: 1,
    drawLabels: true,
    drawAxisLine: true,
    drawGridLines: true,
    //fontFamily: 'HelveticaNeue-Medium',
    //fontWeight: 'bold',
    textSize: 12,
    textColor: processColor('gray'),
  },
};
const xAxis = {
  enabled: true,
  granularity: 1,
  drawLabels: true,
  position: 'BOTTOM',
  drawAxisLine: true,
  drawGridLines: true,
  fontWeight: 'bold',
  textSize: 12,
  textColor: processColor('gray'),
};

export const WhoChart = ({ gender, type, ...props }) => {
  console.log(dataSets);
  return (
    <LineChart
      {...props}
      style={props.style}
      data={data}
      chartDescription={{ text: 'WHO standards' }}
      legend={legend}
      marker={marker}
      // xAxis={this.state.xAxis}
      xAxis={xAxis}
      yAxis={yAxis}
      drawGridBackground={true}
      //borderColor={processColor('teal')}
      animation={{
        durationX: 0,
        durationY: 400,
        easingY: 'EaseInOutQuart',
      }}
      borderWidth={1}
      drawBorders={true}
      autoScaleMinMaxEnabled={true}
      touchEnabled={true}
      dragEnabled={true}
      scaleEnabled={true}
      scaleXEnabled={true}
      scaleYEnabled={true}
      pinchZoom={true}
      doubleTapToZoomEnabled={true}
      highlightPerTapEnabled={true}
      highlightPerDragEnabled={false}
      visibleRange={visibleRange}
      dragDecelerationEnabled={true}
      dragDecelerationFrictionCoef={0.99}
      //      ref="chart"
      keepPositionOnRotation={false}
      // onSelect={this.handleSelect.bind(this)}
      // onChange={event => console.log(event.nativeEvent)}
    />
  );
};

export default WhoChart;
