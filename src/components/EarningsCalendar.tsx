import { useState, useMemo, useEffect } from 'react';
import { DollarSign, TrendingUp, Search } from 'lucide-react';
import { earningsData, EarningsData } from '../data/mockEarningsData';
import { fetchEarningsCalendar } from '../services/finnhubApi';

type TimeFilter = 'today' | 'tomorrow' | 'week' | 'nextWeek';

export function EarningsCalendar() {
  const [activeTab, setActiveTab] = useState<TimeFilter>('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [earnings, setEarnings] = useState<EarningsData[]>(earningsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEarningsData = async () => {
      try {
        const today = new Date();
        const weekFromNow = new Date(today);
        weekFromNow.setDate(today.getDate() + 14);

        const fromDate = today.toISOString().split('T')[0];
        const toDate = weekFromNow.toISOString().split('T')[0];

        const apiEarnings = await fetchEarningsCalendar(fromDate, toDate);

        if (apiEarnings && apiEarnings.length > 0) {
          const formattedEarnings: EarningsData[] = apiEarnings
            .filter(e => e.symbol && e.date)
            .map((e, index) => ({
              id: `${e.symbol}-${e.date}-${index}`,
              ticker: e.symbol,
              companyName: e.symbol,
              sector: 'Technology',
              reportDate: e.date,
              reportTime: e.hour === 'bmo' ? 'BMO' : e.hour === 'amc' ? 'AMC' : 'AMC' as const,
              expectedEPS: e.epsEstimate ?? 0,
              actualEPS: e.epsActual ?? null,
              revenueExpected: e.revenueEstimate ? `$${(e.revenueEstimate / 1000000).toFixed(0)}M` : '—',
              revenueActual: e.revenueActual ? `$${(e.revenueActual / 1000000).toFixed(0)}M` : null,
              analystRating: 'Hold' as const,
              surprise: e.epsActual && e.epsEstimate ?
                       ((e.epsActual - e.epsEstimate) / e.epsEstimate * 100) : null,
              marketCap: 'Large' as const,
              lastQuarterSurprise: 0
            }));

          if (formattedEarnings.length > 0) {
            setEarnings(formattedEarnings);
          } else {
            console.log('No API earnings data, using mock data');
            setEarnings(earningsData);
          }
        } else {
          console.log('No API earnings data available, using mock data');
          setEarnings(earningsData);
        }
      } catch (error) {
        console.error('Error loading earnings calendar:', error);
        console.log('Falling back to mock data due to error');
        setEarnings(earningsData);
      } finally {
        setLoading(false);
      }
    };

    loadEarningsData();
  }, []);

  const getDateRange = (filter: TimeFilter) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + 6);
    const nextWeekStart = new Date(today);
    nextWeekStart.setDate(today.getDate() + 7);
    const nextWeekEnd = new Date(today);
    nextWeekEnd.setDate(today.getDate() + 13);

    switch (filter) {
      case 'today':
        return { start: today, end: today };
      case 'tomorrow':
        return { start: tomorrow, end: tomorrow };
      case 'week':
        return { start: today, end: weekEnd };
      case 'nextWeek':
        return { start: nextWeekStart, end: nextWeekEnd };
    }
  };

  const filteredEarnings = useMemo(() => {
    const { start, end } = getDateRange(activeTab);

    return earnings.filter(earning => {
      const earningDate = new Date(earning.reportDate + 'T00:00:00');
      earningDate.setHours(0, 0, 0, 0);

      const startTime = start.getTime();
      const endTime = end.getTime();
      const earningTime = earningDate.getTime();

      const matchesDate = earningTime >= startTime && earningTime <= endTime;
      const matchesSearch =
        earning.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        earning.companyName.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesDate && matchesSearch;
    });
  }, [activeTab, searchTerm, earnings]);

  const getRatingColor = (rating: EarningsData['analystRating']) => {
    switch (rating) {
      case 'Strong Buy':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'Buy':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'Hold':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'Sell':
        return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      case 'Strong Sell':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-6 h-6 text-blue-900 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Earnings Calendar
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === 'today'
                  ? 'bg-blue-900 dark:bg-blue-800 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('tomorrow')}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === 'tomorrow'
                  ? 'bg-blue-900 dark:bg-blue-800 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              Tomorrow
            </button>
            <button
              onClick={() => setActiveTab('week')}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === 'week'
                  ? 'bg-blue-900 dark:bg-blue-800 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setActiveTab('nextWeek')}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === 'nextWeek'
                  ? 'bg-blue-900 dark:bg-blue-800 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              Next Week
            </button>
          </div>

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search ticker or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEarnings.map((earning) => (
            <div
              key={earning.id}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-900 dark:text-blue-400">
                      {earning.ticker.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {earning.ticker}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                      {earning.companyName}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getRatingColor(earning.analystRating)}`}>
                  {earning.analystRating}
                </span>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Report Date:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(earning.reportDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })} {earning.reportTime}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Expected EPS:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${typeof earning.expectedEPS === 'number' ? earning.expectedEPS.toFixed(2) : '—'}
                  </span>
                </div>
                {earning.actualEPS !== null && earning.actualEPS !== undefined && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Actual EPS:</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        ${earning.actualEPS.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Surprise:</span>
                      <span className={`font-semibold flex items-center gap-1 ${
                        earning.surprise && earning.surprise > 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {earning.surprise !== null && earning.surprise !== undefined ? (
                          <>
                            {earning.surprise > 0 ? '+' : ''}
                            {earning.surprise.toFixed(2)}%
                            {earning.surprise > 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : null}
                          </>
                        ) : (
                          '—'
                        )}
                      </span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Revenue (Est):</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${earning.revenueExpected}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 dark:text-gray-400">
                    {earning.sector}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {earning.marketCap} Cap
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEarnings.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No earnings reports found for this period
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
