import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMarketSnapshot, calculateVolumeRatio } from '../../lib/data/adapters/market';
import cache from '../../lib/cache';

const Card = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing[6]};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[6]};
  
  h2 {
    font-size: ${props => props.theme.typography.fontSize.xl};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    color: ${props => props.theme.colors.heading};
    margin: 0;
  }
`;

const RefreshButton = styled.button`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.muted};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.theme.colors.panel};
    border-color: ${props => props.theme.colors.muted};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CompanyCard = styled.div`
  background: ${props => props.theme.colors.panel};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const CompanyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[3]};
  
  h3 {
    font-size: ${props => props.theme.typography.fontSize.base};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    color: ${props => props.theme.colors.heading};
    margin: 0;
  }
  
  .ticker {
    font-size: ${props => props.theme.typography.fontSize.sm};
    color: ${props => props.theme.colors.muted};
  }
`;

const PriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[3]};
  
  .price {
    font-size: ${props => props.theme.typography.fontSize.lg};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    color: ${props => props.theme.colors.heading};
  }
  
  .change {
    font-size: ${props => props.theme.typography.fontSize.sm};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    
    &.positive {
      color: ${props => props.theme.colors.success};
    }
    
    &.negative {
      color: ${props => props.theme.colors.error};
    }
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const Metric = styled.div`
  .label {
    font-size: ${props => props.theme.typography.fontSize.xs};
    color: ${props => props.theme.colors.muted};
    margin-bottom: ${props => props.theme.spacing[1]};
  }
  
  .value {
    font-size: ${props => props.theme.typography.fontSize.sm};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    color: ${props => props.theme.colors.heading};
  }
`;

const Sparkline = styled.div`
  height: 30px;
  background: linear-gradient(90deg, ${props => props.theme.colors.divider} 0%, ${props => props.theme.colors.muted} 100%);
  border-radius: ${props => props.theme.borderRadius.sm};
  margin-top: ${props => props.theme.spacing[2]};
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent 0%, ${props => props.theme.colors.black} 50%, transparent 100%);
    animation: sparkline 2s ease-in-out;
  }
  
  @keyframes sparkline {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const CompareButton = styled.button`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.muted};
  cursor: pointer;
  transition: all 0.2s;
  margin-top: ${props => props.theme.spacing[4]};
  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.panel};
    border-color: ${props => props.theme.colors.muted};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.muted};
  
  h3 {
    font-size: ${props => props.theme.typography.fontSize.lg};
    margin-bottom: ${props => props.theme.spacing[2]};
  }
  
  p {
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

const InvestmentAnalytics = ({ tickers }) => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadMarketData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const cacheKey = `market_${tickers.join(',')}`;
      let cachedData = cache.get(cacheKey);
      
      if (!cachedData || isRefresh) {
        cachedData = await getMarketSnapshot(tickers);
        cache.set(cacheKey, cachedData, 60000); // 1 minute cache
      }
      
      setMarketData(cachedData);
    } catch (error) {
      console.error('Failed to load market data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadMarketData();
  }, [tickers]);

  const handleRefresh = () => {
    loadMarketData(true);
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const formatChange = (change, changePercent) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`;
  };

  const getChangeClass = (change) => {
    return change >= 0 ? 'positive' : 'negative';
  };

  const formatVolumeRatio = (ratio) => {
    return `${ratio.toFixed(1)}x`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h2>Investment Analytics</h2>
        </CardHeader>
        <div className="skeleton" style={{ height: '400px', borderRadius: '8px' }} />
      </Card>
    );
  }

  if (marketData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h2>Investment Analytics</h2>
        </CardHeader>
        <EmptyState>
          <h3>No market data available</h3>
          <p>Add companies to your watchlist to see their market metrics</p>
        </EmptyState>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2>Investment Analytics</h2>
        <RefreshButton onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </RefreshButton>
      </CardHeader>
      
      {marketData.map((company) => (
        <CompanyCard key={company.ticker}>
          <CompanyHeader>
            <h3>{company.company}</h3>
            <div className="ticker">{company.ticker}</div>
          </CompanyHeader>
          
          <PriceInfo>
            <div className="price">{formatPrice(company.price)}</div>
            <div className={`change ${getChangeClass(company.change)}`}>
              {formatChange(company.change, company.changePercent)}
            </div>
          </PriceInfo>
          
          <MetricsGrid>
            <Metric>
              <div className="label">P/E (TTM)</div>
              <div className="value">{company.pe}</div>
            </Metric>
            <Metric>
              <div className="label">EV/EBITDA</div>
              <div className="value">{company.evEbitda}</div>
            </Metric>
            <Metric>
              <div className="label">P/S (TTM)</div>
              <div className="value">{company.ps}</div>
            </Metric>
            <Metric>
              <div className="label">RSI (14)</div>
              <div className="value">{company.rsi14}</div>
            </Metric>
            <Metric>
              <div className="label">Volume Ratio</div>
              <div className="value">{formatVolumeRatio(calculateVolumeRatio(company.volume, company.avgVolume30d))}</div>
            </Metric>
            <Metric>
              <div className="label">Volatility (20D)</div>
              <div className="value">{company.volatility20d}%</div>
            </Metric>
          </MetricsGrid>
          
          <Sparkline />
        </CompanyCard>
      ))}
      
      <CompareButton>
        Compare Companies
      </CompareButton>
    </Card>
  );
};

export default InvestmentAnalytics;