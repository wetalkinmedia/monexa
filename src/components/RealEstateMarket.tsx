import { useState, useEffect } from 'react';
import { Home, TrendingUp, TrendingDown, MapPin, Filter, Building2, Loader2 } from 'lucide-react';
import { realEstateData, rentalMarketData, RealEstateArea } from '../data/mockRealEstateData';
import { aggregateMarketData } from '../services/realEstateApi';

type MarketView = 'hottest' | 'coldest' | 'priceUp' | 'priceDown' | 'rentals' | 'all';

const TRACKED_CITIES = [
  { city: 'Miami Beach', state: 'FL', zipCode: '33139' },
  { city: 'Austin', state: 'TX', zipCode: '78701' },
  { city: 'Scottsdale', state: 'AZ', zipCode: '85251' },
  { city: 'Charlotte', state: 'NC', zipCode: '28202' },
  { city: 'Nashville', state: 'TN', zipCode: '37203' },
  { city: 'Atlanta', state: 'GA', zipCode: '30303' },
  { city: 'Las Vegas', state: 'NV', zipCode: '89109' },
  { city: 'Miami', state: 'FL', zipCode: '33131' },
  { city: 'Orlando', state: 'FL', zipCode: '32801' },
  { city: 'Dallas', state: 'TX', zipCode: '75201' },
];

export function RealEstateMarket() {
  const [activeView, setActiveView] = useState<MarketView>('hottest');
  const [searchTerm, setSearchTerm] = useState('');
  const [liveData, setLiveData] = useState<RealEstateArea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUsingLiveData, setIsUsingLiveData] = useState(false);

  useEffect(() => {
    const fetchLiveData = async () => {
      const hasApiKey = !!import.meta.env.VITE_RAPIDAPI_KEY;
      if (!hasApiKey) {
        console.log('RapidAPI key not configured. Using mock data. See RAPIDAPI_SETUP.md for setup instructions.');
        return;
      }

      setIsLoading(true);
      try {
        const data = await aggregateMarketData(TRACKED_CITIES);
        if (data && data.length > 0) {
          setLiveData(data);
          setIsUsingLiveData(true);
        }
      } catch (error) {
        console.error('Failed to fetch live real estate data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveData();
  }, []);

  const getFilteredData = (): RealEstateArea[] => {
    const dataSource = isUsingLiveData && liveData.length > 0 ? liveData : (activeView === 'rentals' ? rentalMarketData : realEstateData);
    let filtered = [...dataSource];

    if (searchTerm) {
      filtered = filtered.filter(
        area =>
          area.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          area.zipCode.includes(searchTerm) ||
          area.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (activeView) {
      case 'hottest':
        return filtered.sort((a, b) => b.salesVolume - a.salesVolume).slice(0, 10);
      case 'coldest':
        return filtered.sort((a, b) => a.salesVolume - b.salesVolume).slice(0, 10);
      case 'priceUp':
        return filtered.sort((a, b) => b.priceChangePercent - a.priceChangePercent).slice(0, 10);
      case 'priceDown':
        return filtered.sort((a, b) => a.priceChangePercent - b.priceChangePercent).slice(0, 10);
      case 'rentals':
        return filtered.sort((a, b) => (b.rentDemandScore || 0) - (a.rentDemandScore || 0)).slice(0, 12);
      case 'all':
        return filtered;
      default:
        return filtered;
    }
  };

  const filteredAreas = getFilteredData();

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(2)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  const getViewTitle = () => {
    switch (activeView) {
      case 'hottest':
        return 'Hottest Markets - Highest Sales Volume';
      case 'coldest':
        return 'Coolest Markets - Lowest Sales Volume';
      case 'priceUp':
        return 'Top Price Increases';
      case 'priceDown':
        return 'Top Price Decreases';
      case 'rentals':
        return 'Best Rental Markets - Top Demand & Yields';
      case 'all':
        return 'All Markets';
      default:
        return 'Real Estate Markets';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Home className="w-6 h-6 text-blue-900 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Real Estate Market Intelligence
            </h2>
          </div>
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading live data...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                isUsingLiveData
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
              }`}>
                {isUsingLiveData ? '● Live Data' : '● Demo Data'}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveView('hottest')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                activeView === 'hottest'
                  ? 'bg-blue-900 dark:bg-blue-800 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Hottest Markets
            </button>
            <button
              onClick={() => setActiveView('coldest')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                activeView === 'coldest'
                  ? 'bg-blue-900 dark:bg-blue-800 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              Coolest Markets
            </button>
            <button
              onClick={() => setActiveView('priceUp')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                activeView === 'priceUp'
                  ? 'bg-blue-900 dark:bg-blue-800 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Price Increases
            </button>
            <button
              onClick={() => setActiveView('priceDown')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                activeView === 'priceDown'
                  ? 'bg-blue-900 dark:bg-blue-800 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              Price Decreases
            </button>
            <button
              onClick={() => setActiveView('rentals')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                activeView === 'rentals'
                  ? 'bg-blue-900 dark:bg-blue-800 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Best Rentals
            </button>
            <button
              onClick={() => setActiveView('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                activeView === 'all'
                  ? 'bg-blue-900 dark:bg-blue-800 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              <Filter className="w-4 h-4" />
              All Markets
            </button>
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by city, state, or ZIP code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getViewTitle()}
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Location
              </th>
              {activeView === 'rentals' ? (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Median Rent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rent Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rental Yield
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Occupancy Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Demand Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Median Price
                  </th>
                </>
              ) : (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Median Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Sales Volume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Sales Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Days on Market
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Inventory
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredAreas.map((area, index) => (
              <tr
                key={area.zipCode}
                className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-bold text-sm">
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {area.city}, {area.state}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ZIP {area.zipCode}
                      </div>
                    </div>
                  </div>
                </td>
                {activeView === 'rentals' ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        ${area.medianRent?.toLocaleString()}/mo
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-semibold ${
                            (area.rentChange || 0) >= 0
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {(area.rentChange || 0) >= 0 ? '+' : ''}${Math.abs(area.rentChange || 0)}
                        </span>
                        <span
                          className={`text-xs ${
                            (area.rentChangePercent || 0) >= 0
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {(area.rentChangePercent || 0) >= 0 ? '+' : ''}
                          {area.rentChangePercent?.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {area.rentalYield?.toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {area.occupancyRate?.toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-bold text-green-600 dark:text-green-400">
                          {area.rentDemandScore}
                        </div>
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${area.rentDemandScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatPrice(area.medianPrice)}
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {formatPrice(area.medianPrice)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-semibold ${
                            area.priceChange >= 0
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {area.priceChange >= 0 ? '+' : ''}
                          {formatPrice(Math.abs(area.priceChange))}
                        </span>
                        <span
                          className={`text-xs ${
                            area.priceChange >= 0
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {area.priceChangePercent >= 0 ? '+' : ''}
                          {area.priceChangePercent.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {area.salesVolume.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-semibold ${
                            area.salesChange >= 0
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {area.salesChange >= 0 ? '+' : ''}
                          {area.salesChange}
                        </span>
                        <span
                          className={`text-xs ${
                            area.salesChange >= 0
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {area.salesChangePercent >= 0 ? '+' : ''}
                          {area.salesChangePercent.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {area.daysOnMarket} days
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {area.inventoryCount.toLocaleString()}
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAreas.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No markets found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
