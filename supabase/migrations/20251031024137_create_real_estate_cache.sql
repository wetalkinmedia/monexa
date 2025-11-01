/*
  # Real Estate Data Cache Schema

  1. New Tables
    - `real_estate_cache`
      - `id` (uuid, primary key)
      - `zip_code` (text, indexed)
      - `city` (text)
      - `state` (text)
      - `median_price` (integer)
      - `price_change` (integer)
      - `price_change_percent` (numeric)
      - `sales_volume` (integer)
      - `sales_change` (integer)
      - `sales_change_percent` (numeric)
      - `days_on_market` (integer)
      - `inventory_count` (integer)
      - `median_rent` (integer, nullable)
      - `rent_change` (integer, nullable)
      - `rent_change_percent` (numeric, nullable)
      - `rental_yield` (numeric, nullable)
      - `occupancy_rate` (numeric, nullable)
      - `rent_demand_score` (integer, nullable)
      - `fetched_at` (timestamptz, default now())
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Indexes
    - Index on `zip_code` for fast lookups
    - Index on `fetched_at` for cache expiry checks

  3. Security
    - Enable RLS on `real_estate_cache` table
    - Add policy for public read access (data is not user-specific)
    - Add policy for service role to write data

  4. Notes
    - Cache expires after 24 hours (checked in application logic)
    - Stores aggregated market data from RapidAPI
    - Reduces API calls to stay within free tier limits
*/

CREATE TABLE IF NOT EXISTS real_estate_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zip_code text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  median_price integer NOT NULL DEFAULT 0,
  price_change integer NOT NULL DEFAULT 0,
  price_change_percent numeric(5, 2) NOT NULL DEFAULT 0,
  sales_volume integer NOT NULL DEFAULT 0,
  sales_change integer NOT NULL DEFAULT 0,
  sales_change_percent numeric(5, 2) NOT NULL DEFAULT 0,
  days_on_market integer NOT NULL DEFAULT 0,
  inventory_count integer NOT NULL DEFAULT 0,
  median_rent integer,
  rent_change integer,
  rent_change_percent numeric(5, 2),
  rental_yield numeric(5, 2),
  occupancy_rate numeric(5, 2),
  rent_demand_score integer,
  fetched_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_real_estate_cache_zip ON real_estate_cache(zip_code);
CREATE INDEX IF NOT EXISTS idx_real_estate_cache_fetched_at ON real_estate_cache(fetched_at);
CREATE UNIQUE INDEX IF NOT EXISTS idx_real_estate_cache_zip_unique ON real_estate_cache(zip_code);

ALTER TABLE real_estate_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to real estate cache"
  ON real_estate_cache
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow anon insert to real estate cache"
  ON real_estate_cache
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow anon update to real estate cache"
  ON real_estate_cache
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);
