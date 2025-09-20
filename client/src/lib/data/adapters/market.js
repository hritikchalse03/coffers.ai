// Market data adapter for price data and market metrics
export const getMarketSnapshot = async (tickers = []) => {
  // Mock market data
  const mockMarketData = {
    'AAPL': {
      ticker: 'AAPL',
      company: 'Apple Inc.',
      price: 189.84,
      change: 2.34,
      changePercent: 1.25,
      volume: 45678900,
      avgVolume30d: 52000000,
      marketCap: '2.95T',
      pe: 28.5,
      evEbitda: 22.1,
      ps: 7.2,
      rsi14: 58.2,
      volatility20d: 18.5,
      priceHistory30d: generateMockPriceHistory(189.84, 30)
    },
    'MSFT': {
      ticker: 'MSFT',
      company: 'Microsoft Corporation',
      price: 374.12,
      change: 5.67,
      changePercent: 1.54,
      volume: 23456700,
      avgVolume30d: 28000000,
      marketCap: '2.78T',
      pe: 32.1,
      evEbitda: 25.3,
      ps: 12.8,
      rsi14: 62.1,
      volatility20d: 16.8,
      priceHistory30d: generateMockPriceHistory(374.12, 30)
    },
    'TSLA': {
      ticker: 'TSLA',
      company: 'Tesla, Inc.',
      price: 248.91,
      change: 12.45,
      changePercent: 5.26,
      volume: 67890100,
      avgVolume30d: 45000000,
      marketCap: '789B',
      pe: 45.2,
      evEbitda: 38.7,
      ps: 8.9,
      rsi14: 71.3,
      volatility20d: 42.1,
      priceHistory30d: generateMockPriceHistory(248.91, 30)
    },
    'GOOGL': {
      ticker: 'GOOGL',
      company: 'Alphabet Inc.',
      price: 138.45,
      change: -1.23,
      changePercent: -0.88,
      volume: 34567800,
      avgVolume30d: 38000000,
      marketCap: '1.74T',
      pe: 24.8,
      evEbitda: 18.9,
      ps: 5.2,
      rsi14: 45.7,
      volatility20d: 22.3,
      priceHistory30d: generateMockPriceHistory(138.45, 30)
    }
  };

  // Filter by tickers if provided
  if (tickers.length > 0) {
    return tickers.map(ticker => mockMarketData[ticker]).filter(Boolean);
  }

  return Object.values(mockMarketData);
};

export const getPriceHistory = async (ticker, days = 30) => {
  // Mock price history data
  const basePrice = 100; // Mock base price
  return generateMockPriceHistory(basePrice, days);
};

function generateMockPriceHistory(basePrice, days) {
  const history = [];
  let currentPrice = basePrice;
  
  for (let i = days; i >= 0; i--) {
    const change = (Math.random() - 0.5) * 0.1; // ±5% max change
    currentPrice = currentPrice * (1 + change);
    history.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      price: Math.round(currentPrice * 100) / 100
    });
  }
  
  return history;
}

export const calculateVolumeRatio = (currentVolume, avgVolume30d) => {
  if (!avgVolume30d || avgVolume30d === 0) return 1;
  return currentVolume / avgVolume30d;
};
