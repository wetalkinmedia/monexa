export interface EconomicEvent {
  id: string;
  date: string;
  time: string;
  event: string;
  country: string;
  countryFlag: string;
  impact: 'high' | 'medium' | 'low';
  forecast: string;
  previous: string;
  actual: string | null;
  description: string;
}

export const economicEvents: EconomicEvent[] = [
  {
    id: '1',
    date: '2025-10-30',
    time: '08:30 AM EST',
    event: 'Non-Farm Payrolls',
    country: 'US',
    countryFlag: '🇺🇸',
    impact: 'high',
    forecast: '150K',
    previous: '254K',
    actual: null,
    description: 'Monthly change in employment excluding the farming industry'
  },
  {
    id: '2',
    date: '2025-10-30',
    time: '08:30 AM EST',
    event: 'Unemployment Rate',
    country: 'US',
    countryFlag: '🇺🇸',
    impact: 'high',
    forecast: '4.1%',
    previous: '4.1%',
    actual: null,
    description: 'Percentage of the total workforce that is unemployed'
  },
  {
    id: '3',
    date: '2025-10-30',
    time: '10:00 AM EST',
    event: 'ISM Manufacturing PMI',
    country: 'US',
    countryFlag: '🇺🇸',
    impact: 'high',
    forecast: '47.5',
    previous: '47.2',
    actual: null,
    description: 'Manufacturing business conditions index'
  },
  {
    id: '4',
    date: '2025-10-31',
    time: '02:00 AM EST',
    event: 'GDP Growth Rate',
    country: 'EU',
    countryFlag: '🇪🇺',
    impact: 'high',
    forecast: '0.3%',
    previous: '0.4%',
    actual: null,
    description: 'Quarterly GDP growth rate for the Eurozone'
  },
  {
    id: '5',
    date: '2025-10-31',
    time: '04:30 AM EST',
    event: 'CPI Year-over-Year',
    country: 'UK',
    countryFlag: '🇬🇧',
    impact: 'high',
    forecast: '1.9%',
    previous: '1.7%',
    actual: null,
    description: 'Consumer Price Index year-over-year change'
  },
  {
    id: '6',
    date: '2025-10-31',
    time: '08:15 AM EST',
    event: 'ADP Employment Change',
    country: 'US',
    countryFlag: '🇺🇸',
    impact: 'medium',
    forecast: '120K',
    previous: '143K',
    actual: null,
    description: 'Private sector employment change'
  },
  {
    id: '7',
    date: '2025-10-31',
    time: '02:00 PM EST',
    event: 'FOMC Statement',
    country: 'US',
    countryFlag: '🇺🇸',
    impact: 'high',
    forecast: '-',
    previous: '-',
    actual: null,
    description: 'Federal Reserve monetary policy statement'
  },
  {
    id: '8',
    date: '2025-11-01',
    time: '08:30 AM EST',
    event: 'Trade Balance',
    country: 'US',
    countryFlag: '🇺🇸',
    impact: 'medium',
    forecast: '-$84.5B',
    previous: '-$84.4B',
    actual: null,
    description: 'Difference between exports and imports'
  },
  {
    id: '9',
    date: '2025-11-01',
    time: '10:00 AM EST',
    event: 'Factory Orders',
    country: 'US',
    countryFlag: '🇺🇸',
    impact: 'low',
    forecast: '0.3%',
    previous: '-0.2%',
    actual: null,
    description: 'Monthly change in factory orders'
  },
  {
    id: '10',
    date: '2025-11-01',
    time: '07:45 PM EST',
    event: 'Manufacturing PMI',
    country: 'CN',
    countryFlag: '🇨🇳',
    impact: 'high',
    forecast: '50.2',
    previous: '49.8',
    actual: null,
    description: 'Chinese manufacturing business conditions'
  },
  {
    id: '11',
    date: '2025-11-02',
    time: '08:30 AM EST',
    event: 'Initial Jobless Claims',
    country: 'US',
    countryFlag: '🇺🇸',
    impact: 'medium',
    forecast: '220K',
    previous: '227K',
    actual: null,
    description: 'Weekly unemployment insurance claims'
  },
  {
    id: '12',
    date: '2025-11-03',
    time: '03:00 AM EST',
    event: 'Retail Sales',
    country: 'EU',
    countryFlag: '🇪🇺',
    impact: 'medium',
    forecast: '0.2%',
    previous: '-0.3%',
    actual: null,
    description: 'Monthly change in retail sales value'
  },
  {
    id: '13',
    date: '2025-11-03',
    time: '08:30 AM EST',
    event: 'Average Hourly Earnings',
    country: 'US',
    countryFlag: '🇺🇸',
    impact: 'high',
    forecast: '0.3%',
    previous: '0.4%',
    actual: null,
    description: 'Monthly change in average hourly wages'
  },
  {
    id: '14',
    date: '2025-11-04',
    time: '09:45 AM EST',
    event: 'Services PMI',
    country: 'US',
    countryFlag: '🇺🇸',
    impact: 'medium',
    forecast: '54.5',
    previous: '55.2',
    actual: null,
    description: 'Service sector business conditions index'
  },
  {
    id: '15',
    date: '2025-11-04',
    time: '06:00 PM EST',
    event: 'Interest Rate Decision',
    country: 'JP',
    countryFlag: '🇯🇵',
    impact: 'high',
    forecast: '-0.10%',
    previous: '-0.10%',
    actual: null,
    description: 'Bank of Japan interest rate decision'
  }
];
