const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

interface FinnhubQuote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

interface FinnhubEarning {
  date: string;
  epsActual: number | null;
  epsEstimate: number;
  hour: string;
  quarter: number;
  revenueActual: number | null;
  revenueEstimate: number;
  symbol: string;
  year: number;
}

interface FinnhubEconomicEvent {
  actual: number | null;
  country: string;
  estimate: number | null;
  event: string;
  impact: string;
  prev: number | null;
  time: string;
}

export async function fetchQuote(symbol: string): Promise<FinnhubQuote | null> {
  if (!FINNHUB_API_KEY) {
    console.log('Finnhub API key not configured, using mock data');
    return null;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch quote');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    return null;
  }
}

export async function fetchEarningsCalendar(
  from: string,
  to: string
): Promise<FinnhubEarning[]> {
  if (!FINNHUB_API_KEY) {
    console.log('Finnhub API key not configured, using mock data');
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/calendar/earnings?from=${from}&to=${to}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch earnings');
    const data = await response.json();
    return data.earningsCalendar || [];
  } catch (error) {
    console.error('Error fetching earnings calendar:', error);
    return [];
  }
}

export async function fetchEconomicCalendar(): Promise<FinnhubEconomicEvent[]> {
  if (!FINNHUB_API_KEY) {
    console.log('Finnhub API key not configured, using mock data');
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/calendar/economic?token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch economic calendar');
    const data = await response.json();
    return data.economicCalendar || [];
  } catch (error) {
    console.error('Error fetching economic calendar:', error);
    return [];
  }
}

export async function fetchMarketNews(category = 'general'): Promise<any[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/news?category=${category}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch news');
    return await response.json();
  } catch (error) {
    console.error('Error fetching market news:', error);
    return [];
  }
}

export async function fetchCompanyProfile(symbol: string): Promise<any> {
  try {
    const response = await fetch(
      `${BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch company profile');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching profile for ${symbol}:`, error);
    return null;
  }
}

export async function fetchCandles(
  symbol: string,
  resolution: string,
  from: number,
  to: number
): Promise<any> {
  try {
    const response = await fetch(
      `${BASE_URL}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch candles');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching candles for ${symbol}:`, error);
    return null;
  }
}

export async function fetchMultipleQuotes(symbols: string[]): Promise<Map<string, FinnhubQuote | null>> {
  const results = new Map<string, FinnhubQuote | null>();

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  for (const symbol of symbols) {
    const quote = await fetchQuote(symbol);
    results.set(symbol, quote);
    await delay(1100);
  }

  return results;
}
