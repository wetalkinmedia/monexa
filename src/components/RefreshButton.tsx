import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface RefreshButtonProps {
  onRefresh: () => void;
}

export function RefreshButton({ onRefresh }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="fixed bottom-8 right-8 p-4 rounded-full bg-blue-900 dark:bg-blue-800 text-white shadow-lg hover:shadow-xl hover:bg-blue-800 dark:hover:bg-blue-700 transition-all disabled:opacity-50 z-40"
      aria-label="Refresh data"
    >
      <RefreshCw
        className={`w-6 h-6 ${isRefreshing ? 'animate-spin' : ''}`}
      />
    </button>
  );
}
