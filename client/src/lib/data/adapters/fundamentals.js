// Fundamentals data adapter for quarterly KPIs and financial metrics
export const getQuarterlyKPIs = async (tickers = []) => {
  // Mock quarterly KPI data
  const mockKPIs = {
    'AAPL': {
      company: 'Apple Inc.',
      ticker: 'AAPL',
      quarters: [
        { quarter: 'Q4 2024', revenue: 94.9, grossMargin: 44.1, operatingMargin: 30.2, eps: 1.46, fcf: 22.1, guidance: 2.1 },
        { quarter: 'Q3 2024', revenue: 81.4, grossMargin: 44.5, operatingMargin: 29.7, eps: 1.20, fcf: 18.9, guidance: 1.8 },
        { quarter: 'Q2 2024', revenue: 90.8, grossMargin: 44.3, operatingMargin: 30.1, eps: 1.52, fcf: 20.3, guidance: 2.0 },
        { quarter: 'Q1 2024', revenue: 119.6, grossMargin: 45.9, operatingMargin: 33.4, eps: 2.18, fcf: 33.7, guidance: 2.5 },
        { quarter: 'Q4 2023', revenue: 89.5, grossMargin: 44.1, operatingMargin: 29.8, eps: 1.46, fcf: 21.8, guidance: 1.9 },
        { quarter: 'Q3 2023', revenue: 81.4, grossMargin: 44.5, operatingMargin: 29.7, eps: 1.20, fcf: 18.9, guidance: 1.8 }
      ]
    },
    'MSFT': {
      company: 'Microsoft Corporation',
      ticker: 'MSFT',
      quarters: [
        { quarter: 'Q4 2024', revenue: 56.5, grossMargin: 70.4, operatingMargin: 44.2, eps: 2.93, fcf: 19.8, guidance: 1.2 },
        { quarter: 'Q3 2024', revenue: 52.9, grossMargin: 70.1, operatingMargin: 43.8, eps: 2.45, fcf: 18.2, guidance: 1.1 },
        { quarter: 'Q2 2024', revenue: 52.7, grossMargin: 70.3, operatingMargin: 44.0, eps: 2.48, fcf: 18.5, guidance: 1.0 },
        { quarter: 'Q1 2024', revenue: 56.5, grossMargin: 70.4, operatingMargin: 44.2, eps: 2.93, fcf: 19.8, guidance: 1.2 },
        { quarter: 'Q4 2023', revenue: 56.2, grossMargin: 70.2, operatingMargin: 44.1, eps: 2.69, fcf: 19.1, guidance: 1.1 },
        { quarter: 'Q3 2023', revenue: 52.9, grossMargin: 70.1, operatingMargin: 43.8, eps: 2.45, fcf: 18.2, guidance: 1.1 }
      ]
    },
    'TSLA': {
      company: 'Tesla, Inc.',
      ticker: 'TSLA',
      quarters: [
        { quarter: 'Q4 2024', revenue: 25.2, grossMargin: 18.2, operatingMargin: 8.2, eps: 0.71, fcf: 2.1, guidance: -0.5 },
        { quarter: 'Q3 2024', revenue: 23.4, grossMargin: 17.9, operatingMargin: 7.8, eps: 0.66, fcf: 1.8, guidance: -0.8 },
        { quarter: 'Q2 2024', revenue: 24.9, grossMargin: 18.1, operatingMargin: 8.0, eps: 0.69, fcf: 2.0, guidance: -0.6 },
        { quarter: 'Q1 2024', revenue: 21.3, grossMargin: 17.5, operatingMargin: 7.2, eps: 0.45, fcf: 1.2, guidance: -1.2 },
        { quarter: 'Q4 2023', revenue: 25.2, grossMargin: 18.2, operatingMargin: 8.2, eps: 0.71, fcf: 2.1, guidance: -0.5 },
        { quarter: 'Q3 2023', revenue: 23.4, grossMargin: 17.9, operatingMargin: 7.8, eps: 0.66, fcf: 1.8, guidance: -0.8 }
      ]
    }
  };

  // Filter by tickers if provided
  if (tickers.length > 0) {
    return tickers.map(ticker => mockKPIs[ticker]).filter(Boolean);
  }

  return Object.values(mockKPIs);
};

export const calculateQoQChange = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const calculateYoYChange = (current, yearAgo) => {
  if (!yearAgo || yearAgo === 0) return 0;
  return ((current - yearAgo) / yearAgo) * 100;
};
