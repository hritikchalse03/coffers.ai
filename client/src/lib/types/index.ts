// TypeScript-style data contracts and types for coffers.ai Dashboard

// Events
export interface EventRow {
  id: string;
  ticker: string;
  company: string;
  datetimeISO: string;     // UTC
  status: "UPCOMING" | "LIVE" | "ENDED";
}

export interface TranscriptInsight {
  ticker: string;
  company: string;
  bullets: string[];       // 5–7 items
  themes: { tag: string; snippet: string; sourceEventId: string; ts?: string }[];
  sentiment: { positive: number; neutral: number; negative: number }; // 0–100
}

// Fundamentals
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

// Market
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

// Companies
export interface CompanyProfile {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
  marketCap: number;
  employees: number;
  website: string;
  description: string;
}

export interface CompanySearchResult {
  ticker: string;
  name: string;
  sector: string;
  marketCap: number;
}

// Dashboard specific types
export interface DashboardState {
  selectedTickers: string[];
  watchlist: string[];
  lastRefresh: number;
  autoRefreshEnabled: boolean;
}

export interface KPITrend {
  name: string;
  current: number;
  previous: number;
  qoqChange: number;
  yoyChange?: number;
  trend: 'up' | 'down' | 'neutral';
  sparkline: number[];
}

export interface ValuationMetrics {
  ticker: string;
  peTTM: number;
  evToEbitdaTTM: number;
  psTTM: number;
  price: number;
  change1D: number;
  change1W: number;
  change1M: number;
  volume: number;
  volumeAvg30: number;
  rsi14: number;
  volatility20d: number;
}

export interface WatchlistItem {
  ticker: string;
  name: string;
  price: number;
  change1D: number;
  addedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  timestamp: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Chart types
export interface SparklineData {
  values: number[];
  labels: string[];
  color: string;
}

export interface ChartConfig {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  color: string;
  strokeWidth: number;
}

// Filter and sort types
export interface EventFilter {
  status?: 'UPCOMING' | 'LIVE' | 'ENDED';
  dateRange?: {
    start: string;
    end: string;
  };
  tickers?: string[];
}

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

// Toast notification types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Analytics event types
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: number;
  userId?: string;
}

// Common utility types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

// Component prop types
export interface PillarProps {
  tickers: string[];
  onRefresh?: () => void;
  loading?: boolean;
}

export interface CardProps {
  title: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  className?: string;
}

// URL state types
export interface DashboardUrlState {
  tickers?: string;
  view?: 'overview' | 'analytics' | 'events';
  refresh?: boolean;
}

// Export all types as a namespace for easier imports
export * from './index';
