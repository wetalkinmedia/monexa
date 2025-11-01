export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
}

export const cryptoData: CryptoData[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    current_price: 67420.50,
    price_change_percentage_24h: 2.45,
    market_cap: 1325000000000,
    total_volume: 42500000000,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    current_price: 3245.80,
    price_change_percentage_24h: -1.25,
    market_cap: 390000000000,
    total_volume: 18300000000,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    current_price: 598.32,
    price_change_percentage_24h: 3.12,
    market_cap: 89500000000,
    total_volume: 2100000000,
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    current_price: 182.45,
    price_change_percentage_24h: 5.67,
    market_cap: 78200000000,
    total_volume: 4500000000,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
  },
  {
    id: 'ripple',
    symbol: 'XRP',
    name: 'XRP',
    current_price: 0.6234,
    price_change_percentage_24h: -0.85,
    market_cap: 34800000000,
    total_volume: 1800000000,
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png'
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    current_price: 0.4521,
    price_change_percentage_24h: 1.92,
    market_cap: 15900000000,
    total_volume: 680000000,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png'
  }
];
