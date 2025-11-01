import { TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchQuote } from '../services/finnhubApi';
import { marketIndices } from '../data/mockStockData';

interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  sparklineData: number[];
}

export function MarketOverview() {
  const [indices, setIndices] = useState<MarketIndex[]>(marketIndices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        const symbols = ['^GSPC', '^IXIC', '^DJI'];
        const updatedIndices = marketIndices.slice(0, 3);

        for (let i = 0; i < symbols.length; i++) {
          const symbol = symbols[i].replace('^', '');
          const quote = await fetchQuote(symbol);

          if (quote && quote.c !== null && quote.d !== null && quote.dp !== null) {
            updatedIndices[i] = {
              ...updatedIndices[i],
              price: quote.c,
              change: quote.d,
              percentChange: quote.dp
            };
          }

          await new Promise(resolve => setTimeout(resolve, 1100));
        }

        setIndices(updatedIndices);
      } catch (error) {
        console.error('Error loading market data:', error);
        setIndices(marketIndices.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    loadMarketData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-6 overflow-x-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="min-w-[200px] h-20 rounded-lg bg-gray-100 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="overflow-x-auto">
          <div className="flex gap-6 min-w-max">
            {indices.map((index) => (
              <div
                key={index.symbol}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700"
              >
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                    {index.name}
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {index.price?.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) || '—'}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {(index.change ?? 0) >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <div className="text-right">
                    <div
                      className={`text-sm font-semibold ${
                        (index.change ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {(index.change ?? 0) >= 0 ? '+' : ''}
                      {index.change?.toFixed(2) || '0.00'}
                    </div>
                    <div
                      className={`text-xs ${
                        (index.percentChange ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {(index.percentChange ?? 0) >= 0 ? '+' : ''}
                      {index.percentChange?.toFixed(2) || '0.00'}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
