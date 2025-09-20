import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.divider};
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.active ? props.theme.colors.heading : props.theme.colors.muted};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? props.theme.colors.black : 'transparent'};
  transition: all 0.2s;

  &:hover {
    color: ${props => props.theme.colors.heading};
  }
`;

const TabContent = styled.div`
  min-height: 200px;
`;

const SummaryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    padding: ${props => props.theme.spacing[3]} 0;
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    font-size: ${props => props.theme.typography.fontSize.sm};
    line-height: 1.6;
    
    &:last-child {
      border-bottom: none;
    }
    
    &::before {
      content: '•';
      color: ${props => props.theme.colors.black};
      font-weight: bold;
      margin-right: ${props => props.theme.spacing[2]};
    }
  }
`;

const ThemesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const ThemeChip = styled.div`
  background: ${props => props.theme.colors.panel};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.heading};
`;

const ThemeDetail = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
  
  h4 {
    font-size: ${props => props.theme.typography.fontSize.sm};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    color: ${props => props.theme.colors.heading};
    margin: 0 0 ${props => props.theme.spacing[2]} 0;
  }
  
  p {
    font-size: ${props => props.theme.typography.fontSize.sm};
    color: ${props => props.theme.colors.muted};
    margin: 0 0 ${props => props.theme.spacing[1]} 0;
  }
  
  .timestamp {
    font-size: ${props => props.theme.typography.fontSize.xs};
    color: ${props => props.theme.colors.muted};
  }
`;

const SentimentBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const SentimentSegment = styled.div`
  flex: 1;
  height: 8px;
  background: ${props => props.color};
  border-radius: ${props => props.theme.borderRadius.sm};
  position: relative;
  
  &::after {
    content: '${props => props.percentage}%';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: ${props => props.theme.typography.fontSize.xs};
    color: ${props => props.theme.colors.muted};
  }
`;

const SentimentLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing[2]};
  
  span {
    font-size: ${props => props.theme.typography.fontSize.sm};
    color: ${props => props.theme.colors.muted};
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

const QualitativeAnalysis = ({ tickers }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const mockInsights = {
    summary: [
      'Strong revenue growth driven by iPhone sales and services expansion',
      'Margins improved due to cost optimization and product mix',
      'China market showing signs of recovery with increased demand',
      'AI and machine learning investments paying off in product development',
      'Supply chain challenges largely resolved with improved efficiency'
    ],
    themes: [
      { name: 'Revenue Growth', count: 12, snippet: 'Strong performance across all product categories', timestamp: '00:15:30' },
      { name: 'China Recovery', count: 8, snippet: 'Market showing positive momentum after recent challenges', timestamp: '00:23:45' },
      { name: 'AI Investment', count: 6, snippet: 'Machine learning capabilities driving product innovation', timestamp: '00:31:20' },
      { name: 'Supply Chain', count: 4, snippet: 'Operational efficiency improvements reducing costs', timestamp: '00:38:15' }
    ],
    sentiment: {
      positive: 65,
      neutral: 25,
      negative: 10
    }
  };

  const loadInsights = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setInsights(mockInsights);
    } catch (error) {
      console.error('Failed to load insights:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, [tickers]);

  const handleRefresh = () => {
    loadInsights(true);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h2>Qualitative Analysis (AI)</h2>
        </CardHeader>
        <div className="skeleton" style={{ height: '300px', borderRadius: '8px' }} />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2>Qualitative Analysis (AI)</h2>
        <RefreshButton onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? 'Refreshing...' : 'Refresh Insights'}
        </RefreshButton>
      </CardHeader>
      
      <Tabs>
        <Tab 
          active={activeTab === 'summary'} 
          onClick={() => setActiveTab('summary')}
        >
          Summary
        </Tab>
        <Tab 
          active={activeTab === 'themes'} 
          onClick={() => setActiveTab('themes')}
        >
          Themes
        </Tab>
        <Tab 
          active={activeTab === 'sentiment'} 
          onClick={() => setActiveTab('sentiment')}
        >
          Sentiment
        </Tab>
      </Tabs>

      <TabContent>
        {activeTab === 'summary' && (
          <SummaryList>
            {insights?.summary.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </SummaryList>
        )}

        {activeTab === 'themes' && (
          <div>
            <ThemesList>
              {insights?.themes.map((theme, index) => (
                <ThemeChip key={index}>
                  {theme.name} ({theme.count})
                </ThemeChip>
              ))}
            </ThemesList>
            {insights?.themes.map((theme, index) => (
              <ThemeDetail key={index}>
                <h4>{theme.name}</h4>
                <p>{theme.snippet}</p>
                <div className="timestamp">{theme.timestamp}</div>
              </ThemeDetail>
            ))}
          </div>
        )}

        {activeTab === 'sentiment' && insights?.sentiment && (
          <div>
            <SentimentBar>
              <SentimentSegment 
                color="#FEF2F2" 
                percentage={insights.sentiment.positive}
              />
              <SentimentSegment 
                color="#F3F4F6" 
                percentage={insights.sentiment.neutral}
              />
              <SentimentSegment 
                color="#FEF2F2" 
                percentage={insights.sentiment.negative}
              />
            </SentimentBar>
            <SentimentLabel>
              <span>Positive: {insights.sentiment.positive}%</span>
              <span>Neutral: {insights.sentiment.neutral}%</span>
              <span>Negative: {insights.sentiment.negative}%</span>
            </SentimentLabel>
          </div>
        )}
      </TabContent>
    </Card>
  );
};

export default QualitativeAnalysis;