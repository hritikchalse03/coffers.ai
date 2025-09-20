// Market data adapter
export interface Snapshot {
  ticker: string;
  price: number;
  change1D: number;        // %
  change1W: number;        // %
  change1M: number;        // %
  vol: number;             // today
  volAvg30: number;
  peTTM?: number;
  evToEbitdaTTM?: number;
  psTTM?: number;
  rsi14?: number;
  vol20d?: number;         // stdev of daily returns * sqrt(252) optional
}

export interface PricePoint {
  date: string;
  price: number;
  volume: number;
}

// Mock data
const mockSnapshots: Snapshot[] = [
  {
    ticker: 'AAPL',
    price: 193.58,
    change1D: 2.35,
    change1W: 5.67,
    change1M: 12.34,
    vol: 45000000,
    volAvg30: 52000000,
    peTTM: 28.5,
    evToEbitdaTTM: 22.1,
    psTTM: 7.8,
    rsi14: 68.2,
    vol20d: 0.25
  },
  {
    ticker: 'MSFT',
    price: 378.85,
    change1D: 1.89,
    change1W: 3.45,
    change1M: 8.92,
    vol: 32000000,
    volAvg30: 38000000,
    peTTM: 32.1,
    evToEbitdaTTM: 25.3,
    psTTM: 11.2,
    rsi14: 72.1,
    vol20d: 0.22
  },
  {
    ticker: 'GOOGL',
    price: 142.56,
    change1D: -0.45,
    change1W: 2.13,
    change1M: 6.78,
    vol: 28000000,
    volAvg30: 35000000,
    peTTM: 24.8,
    evToEbitdaTTM: 18.7,
    psTTM: 5.9,
    rsi14: 58.9,
    vol20d: 0.28
  },
  {
    ticker: 'TSLA',
    price: 248.42,
    change1D: 4.12,
    change1W: 8.76,
    change1M: 15.23,
    vol: 85000000,
    volAvg30: 72000000,
    peTTM: 65.2,
    evToEbitdaTTM: 45.8,
    psTTM: 8.1,
    rsi14: 75.4,
    vol20d: 0.45
  },
  {
    ticker: 'AMZN',
    price: 155.18,
    change1D: 1.23,
    change1W: 4.56,
    change1M: 9.87,
    vol: 42000000,
    volAvg30: 48000000,
    peTTM: 45.3,
    evToEbitdaTTM: 28.9,
    psTTM: 2.8,
    rsi14: 61.7,
    vol20d: 0.31
  }
];

// Generate mock price series for sparklines
function generatePriceSeries(ticker: string, days: number = 30): PricePoint[] {
  const basePrice = mockSnapshots.find(s => s.ticker === ticker)?.price || 100;
  const points: PricePoint[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate realistic price movement
    const volatility = 0.02; // 2% daily volatility
    const trend = 0.001; // Slight upward trend
    const randomChange = (Math.random() - 0.5) * volatility;
    const priceChange = trend + randomChange;
    
    const price = basePrice * (1 + priceChange * (days - i) / days);
    const volume = Math.floor(Math.random() * 10000000) + 20000000;
    
    points.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
      volume
    });
  }
  
  return points;
}

export async function getSnapshot(tickers: string[]): Promise<Snapshot[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const snapshots = mockSnapshots.filter(snapshot => 
    tickers.includes(snapshot.ticker)
  );
  
  return snapshots;
}

export async function getSeries(ticker: string, range: '1D' | '1W' | '1M' | '3M' | '1Y' = '1M'): Promise<PricePoint[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const daysMap = {
    '1D': 1,
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '1Y': 365
  };
  
  const days = daysMap[range];
  return generatePriceSeries(ticker, days);
}

export async function getMultipleSeries(tickers: string[], range: '1D' | '1W' | '1M' | '3M' | '1Y' = '1M'): Promise<Record<string, PricePoint[]>> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const result: Record<string, PricePoint[]> = {};
  
  for (const ticker of tickers) {
    result[ticker] = await getSeries(ticker, range);
  }
  
  return result;
}

// TODO: Replace with real API calls
// - Integrate with market data providers (Alpha Vantage, IEX Cloud, Yahoo Finance, etc.)
// - Add real-time streaming data via WebSockets
// - Implement proper technical indicators calculation
// - Add caching with appropriate TTL for different data types
// - Add error handling and retry logic
