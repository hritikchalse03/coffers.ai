import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getQuarterlyKPIs, calculateQoQChange, calculateYoYChange } from '../../lib/data/adapters/fundamentals';
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

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing[4]};
`;

const KPICard = styled.div`
  background: ${props => props.theme.colors.panel};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: ${props => props.theme.spacing[4]};
`;

const KPILabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.muted};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const KPIValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.heading};
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const KPIChange = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  
  &.positive {
    color: ${props => props.theme.colors.success};
  }
  
  &.negative {
    color: ${props => props.theme.colors.error};
  }
  
  &.neutral {
    color: ${props => props.theme.colors.muted};
  }
`;

const ChangeIndicator = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs};
`;

const Sparkline = styled.div`
  height: 20px;
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

const DetailsButton = styled.button`
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

const QuantAnalytics = ({ tickers }) => {
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadKPIs = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const cacheKey = `kpis_${tickers.join(',')}`;
      let cachedKPIs = cache.get(cacheKey);
      
      if (!cachedKPIs || isRefresh) {
        cachedKPIs = await getQuarterlyKPIs(tickers);
        cache.set(cacheKey, cachedKPIs, 300000); // 5 minute cache
      }
      
      setKpis(cachedKPIs);
    } catch (error) {
      console.error('Failed to load KPIs:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadKPIs();
  }, [tickers]);

  const handleRefresh = () => {
    loadKPIs(true);
  };

  const formatValue = (value, type) => {
    if (type === 'revenue' || type === 'fcf') {
      return `$${value}B`;
    }
    if (type === 'margin' || type === 'eps') {
      return `${value}%`;
    }
    return value.toString();
  };

  const getChangeClass = (change) => {
    if (change > 0) return 'positive';
    if (change < 0) return 'negative';
    return 'neutral';
  };

  const getChangeIndicator = (change) => {
    if (change > 0) return '▲';
    if (change < 0) return '▼';
    return '—';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h2>Quant Analytics (QoQ vs YoY)</h2>
        </CardHeader>
        <div className="skeleton" style={{ height: '400px', borderRadius: '8px' }} />
      </Card>
    );
  }

  if (kpis.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h2>Quant Analytics (QoQ vs YoY)</h2>
        </CardHeader>
        <EmptyState>
          <h3>No KPI data available</h3>
          <p>Add companies to your watchlist to see their financial metrics</p>
        </EmptyState>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2>Quant Analytics (QoQ vs YoY)</h2>
        <RefreshButton onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </RefreshButton>
      </CardHeader>
      
      {kpis.map((company) => {
        const latest = company.quarters[0];
        const previous = company.quarters[1];
        const yearAgo = company.quarters[4];

        const kpiData = [
          {
            label: 'Revenue',
            value: latest.revenue,
            qoq: calculateQoQChange(latest.revenue, previous.revenue),
            yoy: calculateYoYChange(latest.revenue, yearAgo.revenue),
            type: 'revenue'
          },
          {
            label: 'Gross Margin',
            value: latest.grossMargin,
            qoq: calculateQoQChange(latest.grossMargin, previous.grossMargin),
            yoy: calculateYoYChange(latest.grossMargin, yearAgo.grossMargin),
            type: 'margin'
          },
          {
            label: 'Operating Margin',
            value: latest.operatingMargin,
            qoq: calculateQoQChange(latest.operatingMargin, previous.operatingMargin),
            yoy: calculateYoYChange(latest.operatingMargin, yearAgo.operatingMargin),
            type: 'margin'
          },
          {
            label: 'EPS',
            value: latest.eps,
            qoq: calculateQoQChange(latest.eps, previous.eps),
            yoy: calculateYoYChange(latest.eps, yearAgo.eps),
            type: 'eps'
          },
          {
            label: 'Free Cash Flow',
            value: latest.fcf,
            qoq: calculateQoQChange(latest.fcf, previous.fcf),
            yoy: calculateYoYChange(latest.fcf, yearAgo.fcf),
            type: 'fcf'
          },
          {
            label: 'Guidance Δ',
            value: latest.guidance,
            qoq: calculateQoQChange(latest.guidance, previous.guidance),
            yoy: calculateYoYChange(latest.guidance, yearAgo.guidance),
            type: 'guidance'
          }
        ];

        return (
          <div key={company.ticker}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#111827', 
              marginBottom: '16px' 
            }}>
              {company.company} ({company.ticker})
            </h3>
            <KPIGrid>
              {kpiData.map((kpi, index) => (
                <KPICard key={index}>
                  <KPILabel>{kpi.label}</KPILabel>
                  <KPIValue>{formatValue(kpi.value, kpi.type)}</KPIValue>
                  <KPIChange className={getChangeClass(kpi.qoq)}>
                    <ChangeIndicator>{getChangeIndicator(kpi.qoq)}</ChangeIndicator>
                    QoQ: {Math.abs(kpi.qoq).toFixed(1)}%
                  </KPIChange>
                  <KPIChange className={getChangeClass(kpi.yoy)}>
                    <ChangeIndicator>{getChangeIndicator(kpi.yoy)}</ChangeIndicator>
                    YoY: {Math.abs(kpi.yoy).toFixed(1)}%
                  </KPIChange>
                  <Sparkline />
                </KPICard>
              ))}
            </KPIGrid>
            <DetailsButton>
              View 6-Quarter Details
            </DetailsButton>
          </div>
        );
      })}
    </Card>
  );
};

export default QuantAnalytics;