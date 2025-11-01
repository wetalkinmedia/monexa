# 📊 Market Intelligence Dashboard

A professional, real-time financial market intelligence dashboard built with React, TypeScript, and Tailwind CSS. Features live market data, economic calendar, earnings reports, and industry stock movers.

## ✨ Features

### 🎯 Core Functionality
- **Real-time Market Overview**: Live data for S&P 500, NASDAQ, Dow Jones, VIX, Treasury yields, Gold, and Bitcoin
- **Economic Calendar**: Searchable calendar with upcoming economic events, filterable by country and impact level
- **Earnings Calendar**: Company earnings reports with EPS data, revenue estimates, and analyst ratings
- **Stock Movers by Industry**: Top 5 gainers and losers across 5 major industries with sparkline charts
- **Dark/Light Theme**: Smooth theme toggle with persistent preferences

### 🎨 Design Features
- Modern, clean financial dashboard aesthetic
- Glassmorphism cards with subtle shadows
- Fully responsive (mobile, tablet, desktop)
- Professional color scheme using deep blues, greens, and reds
- Smooth transitions and hover effects
- Loading states and skeleton screens

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd market-intelligence-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. **Get your free Finnhub API key** (takes 30 seconds)
   - Visit [https://finnhub.io/register](https://finnhub.io/register)
   - Sign up with your email
   - Copy your API key
   - Add it to your `.env` file:
   ```
   VITE_FINNHUB_API_KEY=your_api_key_here
   ```

5. Start the development server
```bash
npm run dev
```

## 📡 API Integration

### Finnhub API (Recommended - Free Tier)

The dashboard is pre-configured to work with Finnhub's generous free tier:

**Free Tier Includes:**
- ✅ 60 API calls per minute
- ✅ Real-time US stock quotes
- ✅ Economic calendar events
- ✅ Earnings calendar data
- ✅ Company fundamentals
- ✅ 1 year of historical data

**Setup Steps:**
1. Register at [finnhub.io/register](https://finnhub.io/register)
2. Get your API key from the dashboard
3. Add to `.env`: `VITE_FINNHUB_API_KEY=your_key`
4. Refresh the app

### Demo Mode

Without an API key, the dashboard runs in demo mode with realistic mock data. This is perfect for:
- Testing the UI/UX
- Development and prototyping
- Presentations and demos

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Finnhub API** - Market data

## 📂 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── MarketOverview.tsx
│   ├── EconomicCalendar.tsx
│   ├── EarningsCalendar.tsx
│   ├── StockMovers.tsx
│   ├── ApiStatusBanner.tsx
│   └── RefreshButton.tsx
├── contexts/           # React contexts
│   └── ThemeContext.tsx
├── data/              # Mock data
│   ├── mockEconomicData.ts
│   ├── mockEarningsData.ts
│   └── mockStockData.ts
├── services/          # API services
│   └── finnhubApi.ts
├── App.tsx
└── main.tsx
```

## 🔧 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript checks
```

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize colors:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#1e3a8a',
        dark: '#1e40af',
      },
    },
  },
}
```

### Adding More APIs
The dashboard is architected to easily integrate additional data sources:

1. **Alpha Vantage** - 25 calls/day free tier
2. **Polygon.io** - 5 calls/minute, end-of-day data
3. **IEX Cloud** - Various free tiers available

## 📊 Data Sources

### Current Implementation
- Market indices (live via Finnhub)
- Economic events (mock data - integrate Finnhub economic calendar)
- Earnings calendar (mock data - integrate Finnhub earnings)
- Stock movers (mock data - calculate from Finnhub quotes)

### Future Enhancements
- WebSocket connections for real-time updates
- Historical chart data
- News feed integration
- Watchlist functionality
- Technical indicators

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Market data provided by [Finnhub](https://finnhub.io)
- Icons by [Lucide](https://lucide.dev)
- Built with [Vite](https://vitejs.dev) and [React](https://react.dev)

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check Finnhub API documentation: [finnhub.io/docs](https://finnhub.io/docs)

---

**Note**: This dashboard is for educational and informational purposes only. Not financial advice.
