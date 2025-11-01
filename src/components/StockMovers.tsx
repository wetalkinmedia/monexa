import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { stocksByIndustry, StockMover } from '../data/mockStockData';
import { fetchQuote } from '../services/finnhubApi';

type Industry = keyof typeof stocksByIndustry;

const industries: { key: Industry; label: string }[] = [
  { key: 'technology', label: 'Technology' },
  { key: 'financialServices', label: 'Financial Services' },
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'energy', label: 'Energy' },
  { key: 'consumerDiscretionary', label: 'Consumer Discretionary' }
];

const industrySymbols: Record<Industry, string[]> = {
  technology: ['AAPL', 'MSFT', 'GOOGL', 'META', 'NVDA', 'TSLA', 'AMD', 'INTC'],
  financialServices: ['JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'USB', 'PNC'],
  healthcare: ['JNJ', 'UNH', 'PFE', 'ABBV', 'TMO', 'MRK', 'ABT', 'DHR'],
  energy: ['XOM', 'CVX', 'COP', 'SLB', 'EOG', 'MPC', 'PSX', 'VLO'],
  consumerDiscretionary: ['AMZN', 'TSLA', 'HD', 'NKE', 'MCD', 'SBUX', 'TGT', 'LOW']
};

function MiniSparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  const isPositive = data[data.length - 1] > data[0];

  return (
    <svg className="w-24 h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? '#10b981' : '#ef4444'}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function StockCard({ stock, type }: { stock: StockMover; type: 'gainer' | 'loser' }) {
  const isGainer = type === 'gainer';

  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
            isGainer
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
          }`}>
            #{stock.rank}
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900 dark:text-white">
              {stock.ticker}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
              {stock.companyName}
            </div>
          </div>
        </div>
        {isGainer ? (
          <TrendingUp className="w-5 h-5 text-green-500" />
        ) : (
          <TrendingDown className="w-5 h-5 text-red-500" />
        )}
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${stock.price.toFixed(2)}
          </span>
          <div className="text-right">
            <div className={`text-sm font-semibold ${
              isGainer ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}
            </div>
            <div className={`text-lg font-bold ${
              isGainer ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {stock.percentChange >= 0 ? '+' : ''}{stock.percentChange.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>Volume: {stock.volume}</span>
          <span>MCap: {stock.marketCap}</span>
        </div>
      </div>

      <div className="mb-3 flex justify-center">
        <MiniSparkline data={stock.sparklineData} />
      </div>

      <div className="pt-3 border-t border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-gray-500 dark:text-gray-400">52W High:</span>
            <span className="ml-1 text-gray-900 dark:text-white font-medium">
              ${stock.high52Week.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">52W Low:</span>
            <span className="ml-1 text-gray-900 dark:text-white font-medium">
              ${stock.low52Week.toFixed(2)}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500 dark:text-gray-400">P/E Ratio:</span>
            <span className="ml-1 text-gray-900 dark:text-white font-medium">
              {stock.peRatio.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StockMovers() {
  const [activeIndustry, setActiveIndustry] = useState<Industry>('technology');
  const [stockData, setStockData] = useState(stocksByIndustry);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadIndustryData = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const symbols = industrySymbols[activeIndustry];
        const quotes: Array<{ symbol: string; quote: any }> = [];

        for (const symbol of symbols) {
          const quote = await fetchQuote(symbol);
          if (quote && quote.c !== null && quote.dp !== null) {
            quotes.push({ symbol, quote });
          }
          await new Promise(resolve => setTimeout(resolve, 1100));
        }

        quotes.sort((a, b) => Math.abs(b.quote.dp) - Math.abs(a.quote.dp));

        const gainers = quotes.filter(q => q.quote.dp > 0).slice(0, 5);
        const losers = quotes.filter(q => q.quote.dp < 0).slice(0, 5);

        const formatStock = (item: { symbol: string; quote: any }, rank: number): StockMover => ({
          rank: rank + 1,
          ticker: item.symbol,
          companyName: item.symbol,
          price: item.quote.c,
          change: item.quote.d,
          percentChange: item.quote.dp,
          volume: '—',
          marketCap: '—',
          high52Week: item.quote.h || item.quote.c,
          low52Week: item.quote.l || item.quote.c,
          peRatio: 0,
          sparklineData: [item.quote.o, item.quote.h, item.quote.l, item.quote.c]
        });

        setStockData(prev => ({
          ...prev,
          [activeIndustry]: {
            gainers: gainers.map((item, i) => formatStock(item, i)),
            losers: losers.map((item, i) => formatStock(item, i))
          }
        }));
      } catch (error) {
        console.error('Error loading stock movers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadIndustryData();
  }, [activeIndustry]);

  const currentData = stockData[activeIndustry];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-6 h-6 text-blue-900 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Top Movers by Industry
          </h2>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {industries.map((industry) => (
            <button
              key={industry.key}
              onClick={() => setActiveIndustry(industry.key)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeIndustry === industry.key
                  ? 'bg-blue-900 dark:bg-blue-800 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              {industry.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Top 5 Gainers
              </h3>
            </div>
            <div className="space-y-3">
              {currentData.gainers.map((stock) => (
                <StockCard key={stock.ticker} stock={stock} type="gainer" />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Top 5 Losers
              </h3>
            </div>
            <div className="space-y-3">
              {currentData.losers.map((stock) => (
                <StockCard key={stock.ticker} stock={stock} type="loser" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
