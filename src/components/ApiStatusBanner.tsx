import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

export function ApiStatusBanner() {
  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
  const hasValidKey = apiKey && apiKey !== 'your_finnhub_api_key_here';

  if (hasValidKey) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-2 text-sm text-green-800 dark:text-green-300">
            <CheckCircle className="w-4 h-4" />
            <span>
              Live market data enabled via Finnhub API
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
              Demo Mode: Using Sample Data
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mb-2">
              To enable live market data, add your free Finnhub API key to the .env file.
              Get your key in 30 seconds at:{' '}
              <a
                href="https://finnhub.io/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline hover:text-amber-900 dark:hover:text-amber-200"
              >
                finnhub.io/register
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-500">
              Free tier includes: 60 calls/minute • Real-time US stocks • Economic calendar • Earnings data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
