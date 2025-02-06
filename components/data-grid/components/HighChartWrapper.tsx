'use client';

import dynamic from 'next/dynamic';
import Highcharts from 'highcharts';
import { HighchartsReactProps } from 'highcharts-react-official';

const HighchartsReact = dynamic(
  () => import('highcharts-react-official'),
  { ssr: false }
);

export default function HighChartWrapper(props: HighchartsReactProps) {
  return <HighchartsReact highcharts={Highcharts} {...props} />;
}