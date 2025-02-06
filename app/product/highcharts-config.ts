// highcharts-config.ts
import Highcharts from 'highcharts';

Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
    numericSymbols: [' mil', ' mi'],
  },
  credits: { enabled: false }
});

export default Highcharts;