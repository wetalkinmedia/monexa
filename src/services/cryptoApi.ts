import { CryptoData } from '../data/mockCryptoData';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

export async function fetchCryptoMarket(): Promise<CryptoData[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching crypto market data:', error);
    throw error;
  }
}
