import { useState, useMemo, useEffect } from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import { economicEvents, EconomicEvent } from '../data/mockEconomicData';
import { fetchEconomicCalendar } from '../services/finnhubApi';

const countryMap: Record<string, string> = {
  'US': '🇺🇸',
  'EU': '🇪🇺',
  'GB': '🇬🇧',
  'JP': '🇯🇵',
  'CN': '🇨🇳',
  'DE': '🇩🇪',
  'FR': '🇫🇷',
  'CA': '🇨🇦',
  'AU': '🇦🇺',
};

const countryNames: Record<string, string> = {
  'US': 'United States',
  'EU': 'Eurozone',
  'GB': 'United Kingdom',
  'JP': 'Japan',
  'CN': 'China',
  'DE': 'Germany',
  'FR': 'France',
  'CA': 'Canada',
  'AU': 'Australia',
};

export function EconomicCalendar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedImpact, setSelectedImpact] = useState<string>('all');
  const [events, setEvents] = useState<EconomicEvent[]>(economicEvents);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEconomicData = async () => {
      try {
        const apiEvents = await fetchEconomicCalendar();

        if (apiEvents && apiEvents.length > 0) {
          const formattedEvents: EconomicEvent[] = apiEvents
            .filter(e => e.time && e.event)
            .map((e, index) => ({
              id: `econ-${index}`,
              date: e.time.split(' ')[0],
              time: e.time.split(' ')[1] || 'TBD',
              event: e.event,
              country: countryNames[e.country] || e.country,
              countryFlag: countryMap[e.country] || '🌍',
              impact: e.impact === 'high' ? 'high' : e.impact === 'medium' ? 'medium' : 'low',
              forecast: e.estimate !== null ? String(e.estimate) : '—',
              previous: e.prev !== null ? String(e.prev) : '—',
              actual: e.actual !== null ? String(e.actual) : null,
              description: `${countryNames[e.country] || e.country} economic indicator`
            }));

          if (formattedEvents.length > 0) {
            setEvents(formattedEvents);
          } else {
            console.log('No API economic data, using mock data');
            setEvents(economicEvents);
          }
        } else {
          console.log('No API economic data available, using mock data');
          setEvents(economicEvents);
        }
      } catch (error) {
        console.error('Error loading economic calendar:', error);
        console.log('Falling back to mock data due to error');
        setEvents(economicEvents);
      } finally {
        setLoading(false);
      }
    };

    loadEconomicData();
  }, []);

  const countries = useMemo(() => {
    const unique = new Set(events.map(e => e.country));
    return Array.from(unique);
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === 'all' || event.country === selectedCountry;
      const matchesImpact = selectedImpact === 'all' || event.impact === selectedImpact;
      return matchesSearch && matchesCountry && matchesImpact;
    });
  }, [searchTerm, selectedCountry, selectedImpact, events]);

  const getImpactBadge = (impact: EconomicEvent['impact']) => {
    switch (impact) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
            🔴 HIGH
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
            🟡 MED
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            🟢 LOW
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-blue-900 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Economic Calendar
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <select
              value={selectedImpact}
              onChange={(e) => setSelectedImpact(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Impact</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Impact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Forecast
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Previous
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actual
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredEvents.map((event) => (
              <tr
                key={event.id}
                className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {event.time}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {event.event}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 max-w-xs truncate">
                    {event.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{event.countryFlag}</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {event.country}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getImpactBadge(event.impact)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {event.forecast}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {event.previous}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {event.actual ? (
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {event.actual}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400 dark:text-gray-500">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEvents.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">No events found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
