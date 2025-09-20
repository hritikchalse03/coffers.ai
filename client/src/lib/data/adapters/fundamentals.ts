// Fundamentals data adapter
export type KPIName = "revenue" | "grossMargin" | "operMargin" | "eps" | "fcf" | "guidanceDelta" | "dau" | "mau" | "churn" | "nrr";

export interface KPIQuarter {
  quarter: string;         // e.g., "Q2-2025"
  value: number;           // raw numeric
}

export interface KPIBlock {
  ticker: string;
  company: string;
  kpis: Record<KPIName, KPIQuarter[]>;
}

// Mock data
const mockKPIBlocks: KPIBlock[] = [
  {
    ticker: 'AAPL',
    company: 'Apple Inc.',
    kpis: {
      revenue: [
        { quarter: 'Q1-2024', value: 119575000000 },
        { quarter: 'Q2-2024', value: 94836000000 },
        { quarter: 'Q3-2024', value: 81897000000 },
        { quarter: 'Q4-2024', value: 89498000000 },
        { quarter: 'Q1-2025', value: 123945000000 },
        { quarter: 'Q2-2025', value: 90753000000 }
      ],
      grossMargin: [
        { quarter: 'Q1-2024', value: 45.9 },
        { quarter: 'Q2-2024', value: 46.6 },
        { quarter: 'Q3-2024', value: 45.2 },
        { quarter: 'Q4-2024', value: 46.1 },
        { quarter: 'Q1-2025', value: 46.3 },
        { quarter: 'Q2-2025', value: 46.8 }
      ],
      operMargin: [
        { quarter: 'Q1-2024', value: 33.8 },
        { quarter: 'Q2-2024', value: 34.1 },
        { quarter: 'Q3-2024', value: 32.9 },
        { quarter: 'Q4-2024', value: 33.5 },
        { quarter: 'Q1-2025', value: 33.9 },
        { quarter: 'Q2-2025', value: 34.2 }
      ],
      eps: [
        { quarter: 'Q1-2024', value: 2.18 },
        { quarter: 'Q2-2024', value: 1.53 },
        { quarter: 'Q3-2024', value: 1.26 },
        { quarter: 'Q4-2024', value: 1.46 },
        { quarter: 'Q1-2025', value: 2.18 },
        { quarter: 'Q2-2025', value: 1.58 }
      ],
      fcf: [
        { quarter: 'Q1-2024', value: 33400000000 },
        { quarter: 'Q2-2024', value: 28500000000 },
        { quarter: 'Q3-2024', value: 21000000000 },
        { quarter: 'Q4-2024', value: 25000000000 },
        { quarter: 'Q1-2025', value: 35000000000 },
        { quarter: 'Q2-2025', value: 29000000000 }
      ],
      guidanceDelta: [
        { quarter: 'Q1-2024', value: 0 },
        { quarter: 'Q2-2024', value: 0 },
        { quarter: 'Q3-2024', value: 0 },
        { quarter: 'Q4-2024', value: 0 },
        { quarter: 'Q1-2025', value: 5000000000 },
        { quarter: 'Q2-2025', value: 0 }
      ],
      dau: [],
      mau: [],
      churn: [],
      nrr: []
    }
  },
  {
    ticker: 'MSFT',
    company: 'Microsoft Corporation',
    kpis: {
      revenue: [
        { quarter: 'Q1-2024', value: 56517000000 },
        { quarter: 'Q2-2024', value: 62020000000 },
        { quarter: 'Q3-2024', value: 61881000000 },
        { quarter: 'Q4-2024', value: 61927000000 },
        { quarter: 'Q1-2025', value: 61800000000 },
        { quarter: 'Q2-2025', value: 62000000000 }
      ],
      grossMargin: [
        { quarter: 'Q1-2024', value: 70.0 },
        { quarter: 'Q2-2024', value: 70.2 },
        { quarter: 'Q3-2024', value: 69.8 },
        { quarter: 'Q4-2024', value: 70.1 },
        { quarter: 'Q1-2025', value: 70.3 },
        { quarter: 'Q2-2025', value: 70.5 }
      ],
      operMargin: [
        { quarter: 'Q1-2024', value: 44.8 },
        { quarter: 'Q2-2024', value: 45.2 },
        { quarter: 'Q3-2024', value: 44.5 },
        { quarter: 'Q4-2024', value: 44.9 },
        { quarter: 'Q1-2025', value: 45.1 },
        { quarter: 'Q2-2025', value: 45.3 }
      ],
      eps: [
        { quarter: 'Q1-2024', value: 2.99 },
        { quarter: 'Q2-2024', value: 3.25 },
        { quarter: 'Q3-2024', value: 3.20 },
        { quarter: 'Q4-2024', value: 3.22 },
        { quarter: 'Q1-2025', value: 3.18 },
        { quarter: 'Q2-2025', value: 3.28 }
      ],
      fcf: [
        { quarter: 'Q1-2024', value: 20000000000 },
        { quarter: 'Q2-2024', value: 22000000000 },
        { quarter: 'Q3-2024', value: 21000000000 },
        { quarter: 'Q4-2024', value: 21500000000 },
        { quarter: 'Q1-2025', value: 20500000000 },
        { quarter: 'Q2-2025', value: 22500000000 }
      ],
      guidanceDelta: [
        { quarter: 'Q1-2024', value: 0 },
        { quarter: 'Q2-2024', value: 0 },
        { quarter: 'Q3-2024', value: 0 },
        { quarter: 'Q4-2024', value: 0 },
        { quarter: 'Q1-2025', value: 0 },
        { quarter: 'Q2-2025', value: 0 }
      ],
      dau: [],
      mau: [],
      churn: [],
      nrr: []
    }
  },
  {
    ticker: 'TSLA',
    company: 'Tesla, Inc.',
    kpis: {
      revenue: [
        { quarter: 'Q1-2024', value: 21330000000 },
        { quarter: 'Q2-2024', value: 24960000000 },
        { quarter: 'Q3-2024', value: 23350000000 },
        { quarter: 'Q4-2024', value: 25167000000 },
        { quarter: 'Q1-2025', value: 21000000000 },
        { quarter: 'Q2-2025', value: 24000000000 }
      ],
      grossMargin: [
        { quarter: 'Q1-2024', value: 19.3 },
        { quarter: 'Q2-2024', value: 18.2 },
        { quarter: 'Q3-2024', value: 17.9 },
        { quarter: 'Q4-2024', value: 18.5 },
        { quarter: 'Q1-2025', value: 17.8 },
        { quarter: 'Q2-2025', value: 18.1 }
      ],
      operMargin: [
        { quarter: 'Q1-2024', value: 5.5 },
        { quarter: 'Q2-2024', value: 4.2 },
        { quarter: 'Q3-2024', value: 3.8 },
        { quarter: 'Q4-2024', value: 4.1 },
        { quarter: 'Q1-2025', value: 3.5 },
        { quarter: 'Q2-2025', value: 3.9 }
      ],
      eps: [
        { quarter: 'Q1-2024', value: 0.45 },
        { quarter: 'Q2-2024', value: 0.62 },
        { quarter: 'Q3-2024', value: 0.53 },
        { quarter: 'Q4-2024', value: 0.71 },
        { quarter: 'Q1-2025', value: 0.42 },
        { quarter: 'Q2-2025', value: 0.58 }
      ],
      fcf: [
        { quarter: 'Q1-2024', value: 2500000000 },
        { quarter: 'Q2-2024', value: 1000000000 },
        { quarter: 'Q3-2024', value: 800000000 },
        { quarter: 'Q4-2024', value: 1200000000 },
        { quarter: 'Q1-2025', value: 600000000 },
        { quarter: 'Q2-2025', value: 900000000 }
      ],
      guidanceDelta: [
        { quarter: 'Q1-2024', value: 0 },
        { quarter: 'Q2-2024', value: 0 },
        { quarter: 'Q3-2024', value: 0 },
        { quarter: 'Q4-2024', value: 0 },
        { quarter: 'Q1-2025', value: -5000000000 },
        { quarter: 'Q2-2025', value: 0 }
      ],
      dau: [],
      mau: [],
      churn: [],
      nrr: []
    }
  }
];

export async function getQuarterlyKPIs(tickers: string[]): Promise<KPIBlock[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const kpiBlocks = mockKPIBlocks.filter(block => 
    tickers.includes(block.ticker)
  );
  
  return kpiBlocks;
}

export async function getKPITrend(ticker: string, kpi: KPIName, quarters: number = 6): Promise<KPIQuarter[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const block = mockKPIBlocks.find(b => b.ticker === ticker);
  if (!block) return [];
  
  const kpiData = block.kpis[kpi] || [];
  return kpiData.slice(-quarters);
}

// Helper function to calculate QoQ and YoY changes
export function calculateQoQChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function calculateYoYChange(current: number, sameQuarterLastYear: number): number {
  if (sameQuarterLastYear === 0) return 0;
  return ((current - sameQuarterLastYear) / sameQuarterLastYear) * 100;
}

// TODO: Replace with real API calls
// - Integrate with financial data providers (Alpha Vantage, IEX Cloud, SEC filings, etc.)
// - Add real-time fundamental data updates
// - Implement proper KPI calculations and validations
// - Add caching with appropriate TTL for different data types
// - Add error handling and data quality checks
