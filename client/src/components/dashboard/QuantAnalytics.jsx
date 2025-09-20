import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getQuarterlyKPIs, calculateQoQChange, calculateYoYChange } from '../../lib/data/adapters/fundamentals';
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

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const KPITile = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: #F3F4F6;
    border-color: #D1D5DB;
  }
`;

const KPITitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 8px;
`;

const KPIValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
`;

const KPIChange = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;

  &.positive {
    color: #059669;
  }

  &.negative {
    color: #DC2626;
  }

  &.neutral {
    color: #6B7280;
  }
`;

const TrendChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;

  &.up {
    background: #D1FAE5;
    color: #059669;
  }

  &.down {
    background: #FEE2E2;
    color: #DC2626;
  }

  &.neutral {
    background: #F3F4F6;
    color: #6B7280;
  }
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

const DetailsButton = styled.button`
  background: none;
  border: none;
  color: #3B82F6;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 8px;

  &:hover {
    color: #2563EB;
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

// Cached version of getQuarterlyKPIs
const getCachedQuarterlyKPIs = withCache(
  getQuarterlyKPIs,
  (tickers) => createCacheKey('quarterly-kpis', tickers.join(',')),
  CACHE_TTL.LONG
);

const QuantAnalytics = ({ tickers = [], onRefresh }) => {
  const [kpiBlocks, setKpiBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadKPIs = async () => {
    if (tickers.length === 0) {
      setKpiBlocks([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getCachedQuarterlyKPIs(tickers);
      setKpiBlocks(data);
    } catch (err) {
      setError('Failed to load KPI data');
      console.error('Error loading KPIs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKPIs();
  }, [tickers]);

  const handleRefresh = () => {
    loadKPIs();
    if (onRefresh) onRefresh();
  };

  const formatValue = (value, kpiName) => {
    if (kpiName === 'revenue' || kpiName === 'fcf') {
      if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
      if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
      return `$${value.toFixed(0)}`;
    }
    if (kpiName === 'grossMargin' || kpiName === 'operMargin') {
      return `${value.toFixed(1)}%`;
    }
    if (kpiName === 'eps') {
      return `$${value.toFixed(2)}`;
    }
    if (kpiName === 'guidanceDelta') {
      if (value === 0) return 'No change';
      return value > 0 ? `+$${(value / 1e9).toFixed(1)}B` : `-$${Math.abs(value) / 1e9}B`;
    }
    return value.toString();
  };

  const getTrendDirection = (qoqChange) => {
    if (qoqChange > 2) return 'up';
    if (qoqChange < -2) return 'down';
    return 'neutral';
  };

  const getTrendText = (qoqChange) => {
    if (qoqChange > 2) return `QoQ up ${qoqChange.toFixed(1)}%`;
    if (qoqChange < -2) return `QoQ down ${Math.abs(qoqChange).toFixed(1)}%`;
    return 'QoQ stable';
  };

  const renderKPITile = (kpiName, kpiData, companyName) => {
    if (!kpiData || kpiData.length < 2) return null;

    const current = kpiData[kpiData.length - 1];
    const previous = kpiData[kpiData.length - 2];
    const qoqChange = calculateQoQChange(current.value, previous.value);
    const trend = getTrendDirection(qoqChange);

    return (
      <KPITile key={kpiName}>
        <KPITitle>{kpiName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</KPITitle>
        <KPIValue>{formatValue(current.value, kpiName)}</KPIValue>
        <KPIChange className={trend}>
          {qoqChange > 0 ? '▲' : qoqChange < 0 ? '▼' : '—'} {qoqChange.toFixed(1)}%
        </KPIChange>
        <TrendChip className={trend}>
          {getTrendText(qoqChange)}
        </TrendChip>
        <SparklineContainer>
          <Sparkline />
        </SparklineContainer>
        <DetailsButton onClick={() => console.log('Show details for', kpiName)}>
          Details
        </DetailsButton>
      </KPITile>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quant Analytics (QoQ vs Last Quarter)</CardTitle>
        </CardHeader>
        <LoadingState>Loading KPI data...</LoadingState>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quant Analytics (QoQ vs Last Quarter)</CardTitle>
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
        <CardTitle>Quant Analytics (QoQ vs Last Quarter)</CardTitle>
        <RefreshButton onClick={handleRefresh} disabled={loading}>
          Refresh
        </RefreshButton>
      </CardHeader>

      {tickers.length === 0 ? (
        <EmptyState>
          <h4>No KPI data</h4>
          <p>Add tickers to your Watchlist to see quantitative analytics</p>
        </EmptyState>
      ) : kpiBlocks.length === 0 ? (
        <EmptyState>
          <h4>No KPI data available</h4>
          <p>Financial data will appear after earnings calls</p>
        </EmptyState>
      ) : (
        <div>
          {kpiBlocks.map((block) => (
            <div key={block.ticker} style={{ marginBottom: '32px' }}>
              <h4 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#111827', 
                margin: '0 0 16px 0' 
              }}>
                {block.company} ({block.ticker})
              </h4>
              <KPIGrid>
                {Object.entries(block.kpis).map(([kpiName, kpiData]) => 
                  renderKPITile(kpiName, kpiData, block.company)
                )}
              </KPIGrid>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default QuantAnalytics;
