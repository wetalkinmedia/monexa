import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { ApiStatusBanner } from './components/ApiStatusBanner';
import { MarketOverview } from './components/MarketOverview';
import { EconomicCalendar } from './components/EconomicCalendar';
import { EarningsCalendar } from './components/EarningsCalendar';
import { StockMovers } from './components/StockMovers';
import { RealEstateMarket } from './components/RealEstateMarket';
import { CryptoMarket } from './components/CryptoMarket';
import { RefreshButton } from './components/RefreshButton';

function AppContent() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = async () => {
    setLastUpdated(new Date());
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      <Header lastUpdated={lastUpdated} />
      <ApiStatusBanner />
      <MarketOverview />

      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div>
              <StockMovers />
            </div>
            <div>
              <CryptoMarket />
            </div>
          </section>

          <section>
            <RealEstateMarket />
          </section>

          <section>
            <EconomicCalendar />
          </section>

          <section>
            <EarningsCalendar />
          </section>
        </div>
      </main>

      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              Market data powered by CoinGecko, Finnhub, and other financial data providers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.coingecko.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                CoinGecko API
              </a>
              <a
                href="https://finnhub.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Finnhub API
              </a>
              <a
                href="https://rapidapi.com/datascraper/api/us-real-estate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                US Real Estate API
              </a>
              <a
                href="https://homesage.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Homesage.ai
              </a>
            </div>
            <p className="mt-4 text-xs">
              © 2025 Market Intelligence Dashboard. Built for professional traders and investors.
            </p>
          </div>
        </div>
      </footer>

      <RefreshButton onRefresh={handleRefresh} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
