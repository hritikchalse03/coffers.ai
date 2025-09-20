import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getSnapshot, getMultipleSeries } from '../../lib/data/adapters/market';
import { withCache, createCacheKey, CACHE_TTL } from '../../lib/cache';

const Card = styled.div`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const RefreshButton = styled.button`
  background: none;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    border-color: #9CA3AF;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CompanySelector = styled.div`
  margin-bottom: 20px;
`;

const SelectorLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const MultiSelect = styled.select`
  width: 100%;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-height: 40px;

  &:focus {
    outline: 2px solid #3B82F6;
    outline-offset: 2px;
  }
`;

const CompanyCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const CompanyCard = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s;

  &:hover {
    background: #F3F4F6;
    border-color: #D1D5DB;
  }
`;

const CompanyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const CompanyName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const CompanyTicker = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
`;

const PriceChange = styled.div`
  font-size: 14px;
  font-weight: 500;

  &.positive {
    color: #059669;
  }

  &.negative {
    color: #DC2626;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
`;

const Metric = styled.div`
  text-align: center;
`;

const MetricLabel = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`;

const MetricValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const SparklineContainer = styled.div`
  height: 40px;
  margin-top: 8px;
  position: relative;
`;

const Sparkline = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #E5E7EB 0%, #D1D5DB 50%, #E5E7EB 100%);
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%);
    border-radius: 4px;
    transform: scaleX(0.7);
    transform-origin: left;
    animation: sparkline 2s ease-in-out;
  }

  @keyframes sparkline {
    0% { transform: scaleX(0); }
    100% { transform: scaleX(0.7); }
  }
`;

const ComparisonTable = styled.div`
  margin-top: 24px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  background: #F9FAFB;
  padding: 12px 16px;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #E5E7EB;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(3, 1fr);
  padding: 12px 16px;
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(even) {
    background: #F9FAFB;
  }
`;

const TableCell = styled.div`
  font-size: 14px;
  color: #374151;

  &.metric {
    font-weight: 500;
  }

  &.value {
    text-align: right;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6B7280;

  h4 {
    margin: 0 0 8px 0;
    color: #374151;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: #6B7280;
`;

// Cached versions
const getCachedSnapshot = withCache(
  getSnapshot,
  (tickers) => createCacheKey('market-snapshot', tickers.join(',')),
  CACHE_TTL.SHORT
);

const getCachedMultipleSeries = withCache(
  getMultipleSeries,
  (tickers, range) => createCacheKey('market-series', tickers.join(','), range),
  CACHE_TTL.MEDIUM
);

const InvestmentAnalytics = ({ tickers = [], onRefresh }) => {
  const [snapshots, setSnapshots] = useState([]);
  const [priceSeries, setPriceSeries] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTickers, setSelectedTickers] = useState(tickers.slice(0, 3));

  const loadData = async () => {
    if (selectedTickers.length === 0) {
      setSnapshots([]);
      setPriceSeries({});
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [snapshotData, seriesData] = await Promise.all([
        getCachedSnapshot(selectedTickers),
        getCachedMultipleSeries(selectedTickers, '1M')
      ]);
      
      setSnapshots(snapshotData);
      setPriceSeries(seriesData);
    } catch (err) {
      setError('Failed to load market data');
      console.error('Error loading market data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedTickers]);

  useEffect(() => {
    setSelectedTickers(tickers.slice(0, 3));
  }, [tickers]);

  const handleRefresh = () => {
    loadData();
    if (onRefresh) onRefresh();
  };

  const handleTickerChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedTickers(selected);
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const getChangeClass = (change) => {
    return change >= 0 ? 'positive' : 'negative';
  };

  const formatMetric = (value, type) => {
    if (type === 'price') return `$${value.toFixed(2)}`;
    if (type === 'ratio') return value.toFixed(1);
    if (type === 'percent') return `${value.toFixed(1)}%`;
    if (type === 'volume') return `${(value / 1e6).toFixed(1)}M`;
    return value.toString();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Investment Analytics</CardTitle>
        </CardHeader>
        <LoadingState>Loading market data...</LoadingState>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Investment Analytics</CardTitle>
          <RefreshButton onClick={handleRefresh}>Retry</RefreshButton>
        </CardHeader>
        <div style={{ color: '#DC2626', textAlign: 'center', padding: '20px' }}>
          {error}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Analytics</CardTitle>
        <RefreshButton onClick={handleRefresh} disabled={loading}>
          Refresh
        </RefreshButton>
      </CardHeader>

      {tickers.length === 0 ? (
        <EmptyState>
          <h4>No market data</h4>
          <p>Add tickers to your Watchlist to see investment analytics</p>
        </EmptyState>
      ) : (
        <>
          <CompanySelector>
            <SelectorLabel>Compare (up to 3 tickers)</SelectorLabel>
            <MultiSelect
              multiple
              value={selectedTickers}
              onChange={handleTickerChange}
            >
              {tickers.map(ticker => (
                <option key={ticker} value={ticker}>{ticker}</option>
              ))}
            </MultiSelect>
          </CompanySelector>

          {snapshots.length > 0 && (
            <>
              <CompanyCards>
                {snapshots.map((snapshot) => (
                  <CompanyCard key={snapshot.ticker}>
                    <CompanyHeader>
                      <div>
                        <CompanyName>{snapshot.ticker}</CompanyName>
                        <CompanyTicker>30D Performance</CompanyTicker>
                      </div>
                    </CompanyHeader>
                    
                    <PriceInfo>
                      <Price>{formatMetric(snapshot.price, 'price')}</Price>
                      <PriceChange className={getChangeClass(snapshot.change1D)}>
                        {formatChange(snapshot.change1D)}
                      </PriceChange>
                    </PriceInfo>

                    <MetricsGrid>
                      <Metric>
                        <MetricLabel>1W</MetricLabel>
                        <MetricValue className={getChangeClass(snapshot.change1W)}>
                          {formatChange(snapshot.change1W)}
                        </MetricValue>
                      </Metric>
                      <Metric>
                        <MetricLabel>1M</MetricLabel>
                        <MetricValue className={getChangeClass(snapshot.change1M)}>
                          {formatChange(snapshot.change1M)}
                        </MetricValue>
                      </Metric>
                      <Metric>
                        <MetricLabel>P/E</MetricLabel>
                        <MetricValue>{formatMetric(snapshot.peTTM || 0, 'ratio')}</MetricValue>
                      </Metric>
                      <Metric>
                        <MetricLabel>RSI</MetricLabel>
                        <MetricValue>{formatMetric(snapshot.rsi14 || 0, 'ratio')}</MetricValue>
                      </Metric>
                    </MetricsGrid>

                    <SparklineContainer>
                      <Sparkline />
                    </SparklineContainer>
                  </CompanyCard>
                ))}
              </CompanyCards>

              {selectedTickers.length > 1 && (
                <ComparisonTable>
                  <TableHeader>Valuation & Momentum Comparison</TableHeader>
                  <TableRow>
                    <TableCell className="metric">Metric</TableCell>
                    {snapshots.map(snapshot => (
                      <TableCell key={snapshot.ticker} className="value">
                        {snapshot.ticker}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="metric">P/E (TTM)</TableCell>
                    {snapshots.map(snapshot => (
                      <TableCell key={snapshot.ticker} className="value">
                        {formatMetric(snapshot.peTTM || 0, 'ratio')}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="metric">EV/EBITDA</TableCell>
                    {snapshots.map(snapshot => (
                      <TableCell key={snapshot.ticker} className="value">
                        {formatMetric(snapshot.evToEbitdaTTM || 0, 'ratio')}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="metric">P/S (TTM)</TableCell>
                    {snapshots.map(snapshot => (
                      <TableCell key={snapshot.ticker} className="value">
                        {formatMetric(snapshot.psTTM || 0, 'ratio')}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="metric">1D Change</TableCell>
                    {snapshots.map(snapshot => (
                      <TableCell key={snapshot.ticker} className="value">
                        <span className={getChangeClass(snapshot.change1D)}>
                          {formatChange(snapshot.change1D)}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="metric">Volume vs Avg</TableCell>
                    {snapshots.map(snapshot => (
                      <TableCell key={snapshot.ticker} className="value">
                        {formatMetric((snapshot.vol / snapshot.volAvg30 - 1) * 100, 'percent')}
                      </TableCell>
                    ))}
                  </TableRow>
                </ComparisonTable>
              )}
            </>
          )}
        </>
      )}
    </Card>
  );
};

export default InvestmentAnalytics;
