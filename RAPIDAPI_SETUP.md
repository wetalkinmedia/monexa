# RapidAPI Real Estate Integration Setup Guide

This guide will help you integrate live real estate data into your Market Intelligence Dashboard using RapidAPI.

## Step 1: Create a RapidAPI Account

1. Visit [RapidAPI](https://rapidapi.com/auth/sign-up)
2. Sign up for a free account
3. Verify your email address

## Step 2: Subscribe to the US Real Estate API

1. Go to the [US Real Estate API page](https://rapidapi.com/datascraper/api/us-real-estate)
2. Click the "Subscribe to Test" button
3. Choose a pricing plan:
   - **Basic (Free)**: Limited requests per month - good for testing
   - **Pro**: Higher limits for production use
   - **Ultra/Mega**: Enterprise-level access

4. Complete the subscription process

## Step 3: Get Your API Key

1. After subscribing, you'll be on the API's endpoint page
2. Look for the "Header Parameters" section on the right side
3. Find `x-rapidapi-key` - this is your API key
4. Click the eye icon to reveal and copy your key

## Step 4: Configure Your Environment

1. Open your `.env` file in the project root
2. Add your RapidAPI key:
   ```
   VITE_RAPIDAPI_KEY=your_actual_rapidapi_key_here
   ```
3. Save the file
4. Restart your development server

## Step 5: Test the Integration

1. The app will automatically detect the API key
2. Real estate data will be fetched from RapidAPI instead of using mock data
3. If the API key is missing, the app will fall back to mock data

## Available API Endpoints

The integration uses the following endpoints:

### Market Trends
- **Endpoint**: `/market-trends`
- **Parameters**: `city`, `state_code`
- **Returns**: Median prices, listing counts, days on market, price trends

### Properties for Sale
- **Endpoint**: `/properties/list-for-sale`
- **Parameters**: `city`, `state_code`, `limit`, `offset`, `sort`
- **Returns**: Active property listings for sale

### Properties for Rent
- **Endpoint**: `/properties/list-for-rent`
- **Parameters**: `city`, `state_code`, `limit`, `offset`, `sort`
- **Returns**: Active rental property listings

### Recently Sold Properties
- **Endpoint**: `/properties/list-sold`
- **Parameters**: `city`, `state_code`, `limit`, `offset`, `sort`
- **Returns**: Recently sold property data

## Data Refresh Strategy

The real estate data is fetched when:
- The page loads for the first time
- You click the refresh button
- You manually reload the page

**Recommendation**: For production use, implement caching to avoid excessive API calls:
- Cache real estate data for 24 hours (markets change slowly)
- Store results in Supabase database
- Only fetch fresh data once per day

## API Rate Limits

Be aware of your plan's rate limits:
- **Free Tier**: ~100 requests/month
- **Pro Tier**: ~1,000-10,000 requests/month (varies by plan)
- Each city query uses 4 API calls (trends, sale, rent, sold)

**Optimization**: The current implementation fetches data for 12-25 cities, which could use 48-100 API calls per refresh. Consider:
- Reducing the number of cities
- Implementing aggressive caching
- Upgrading to a higher tier plan

## Troubleshooting

### "Using mock data" message
- Check that `VITE_RAPIDAPI_KEY` is set in `.env`
- Verify the API key is correct
- Restart your dev server after adding the key

### Rate limit errors (429)
- You've exceeded your plan's request limit
- Wait for the limit to reset (usually monthly)
- Upgrade to a higher tier plan
- Implement caching to reduce requests

### Authentication errors (401/403)
- Your API key is invalid or expired
- Check your RapidAPI subscription is active
- Verify you copied the complete key

## Cost Considerations

**Free Tier with Smart Caching** (CURRENT SETUP):
- 10 cities × 4 endpoints = 40 requests per full refresh
- With free tier (100 requests/month) = 2-3 full refreshes per month
- **With 24-hour Supabase cache**: Data only fetches once per day
- **Monthly usage**: ~30-40 API calls (one refresh per day)
- **Recommendation**: Perfect for free tier! Cache keeps you well under limits

**How the Cache Works**:
1. First visit: Fetches fresh data from RapidAPI (40 calls)
2. Saves all data to Supabase database
3. For next 24 hours: Uses cached data (0 API calls)
4. After 24 hours: Fetches fresh data again (40 calls)
5. Monthly total: ~30-40 calls (well under 100 free limit)

**Pro Tier Usage**:
- With 1,000 requests/month = ~25 full refreshes
- With daily caching = still only needs ~30 refreshes (one per day)
- **Recommendation**: Not needed with caching system!

## Next Steps

1. Add the API key to your `.env` file
2. Restart the development server
3. Data will automatically cache in Supabase for 24 hours
4. Monitor API usage in your RapidAPI dashboard
5. Check console logs to see cache hits vs fresh fetches

## Support

- **RapidAPI Support**: [support.rapidapi.com](https://support.rapidapi.com)
- **API Documentation**: [US Real Estate API Docs](https://rapidapi.com/datascraper/api/us-real-estate)
- **API Status**: Check your usage on your RapidAPI dashboard

---

**Note**: The application is configured to gracefully fall back to mock data if the API key is not configured or if requests fail. This ensures the dashboard always displays data, even during development or if API limits are exceeded.
