import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRecentTranscriptInsights } from '../../lib/data/adapters/events';
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
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #2563EB;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;

  &.active {
    color: #3B82F6;
    border-bottom-color: #3B82F6;
  }

  &:hover:not(.active) {
    color: #374151;
  }
`;

const TabContent = styled.div`
  min-height: 200px;
`;

const SummarySection = styled.div`
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 12px 0;
  }
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #374151;

  &::before {
    content: '•';
    color: #3B82F6;
    font-weight: bold;
    margin-right: 8px;
    margin-top: 2px;
  }
`;

const ViewEventLink = styled.button`
  background: none;
  border: none;
  color: #3B82F6;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 12px;

  &:hover {
    color: #2563EB;
  }
`;

const ThemesSection = styled.div`
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 16px 0;
  }
`;

const ThemeChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const ThemeChip = styled.div`
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
`;

const ThemeSnippets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ThemeSnippet = styled.div`
  padding: 12px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;

  .tag {
    font-weight: 600;
    color: #3B82F6;
    margin-right: 8px;
  }

  .snippet {
    color: #374151;
  }

  .source {
    font-size: 12px;
    color: #6B7280;
    margin-top: 4px;
  }
`;

const SentimentSection = styled.div`
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 16px 0;
  }
`;

const SentimentMeter = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const SentimentBar = styled.div`
  flex: 1;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const SentimentFill = styled.div`
  height: 100%;
  background: linear-gradient(to right, #DC2626 0%, #F59E0B 50%, #059669 100%);
  border-radius: 4px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: white;
    box-shadow: 0 0 0 1px #374151;
  }
`;

const SentimentLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
`;

const SentimentValues = styled.div`
  display: flex;
  gap: 24px;
  font-size: 14px;
`;

const SentimentValue = styled.div`
  text-align: center;

  .label {
    color: #6B7280;
    font-size: 12px;
    margin-bottom: 4px;
  }

  .value {
    font-weight: 600;
    color: #111827;
  }

  &.positive .value {
    color: #059669;
  }

  &.negative .value {
    color: #DC2626;
  }
`;

const SentimentNote = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
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

// Cached version of getRecentTranscriptInsights
const getCachedTranscriptInsights = withCache(
  getRecentTranscriptInsights,
  (tickers) => createCacheKey('transcript-insights', tickers.join(',')),
  CACHE_TTL.MEDIUM
);

const QualitativeAnalysis = ({ tickers = [], onRefresh }) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [refreshing, setRefreshing] = useState(false);

  const loadInsights = async () => {
    if (tickers.length === 0) {
      setInsights([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getCachedTranscriptInsights(tickers);
      setInsights(data);
    } catch (err) {
      setError('Failed to load insights');
      console.error('Error loading insights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, [tickers]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Simulate AI refresh call
      await new Promise(resolve => setTimeout(resolve, 2000));
      await loadInsights();
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Error refreshing insights:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const getSentimentPosition = (positive, negative) => {
    const total = positive + negative;
    if (total === 0) return 50;
    return (positive / total) * 100;
  };

  const getSentimentColor = (positive, negative) => {
    if (positive > negative) return '#059669';
    if (negative > positive) return '#DC2626';
    return '#F59E0B';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Qualitative Analysis (AI)</CardTitle>
        </CardHeader>
        <LoadingState>Loading AI insights...</LoadingState>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Qualitative Analysis (AI)</CardTitle>
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
        <CardTitle>Qualitative Analysis (AI)</CardTitle>
        <RefreshButton 
          onClick={handleRefresh} 
          disabled={loading || refreshing}
        >
          {refreshing ? 'Refreshing...' : 'Refresh Insights'}
        </RefreshButton>
      </CardHeader>

      {tickers.length === 0 ? (
        <EmptyState>
          <h4>No insights available</h4>
          <p>Add tickers to your Watchlist to see AI analysis</p>
        </EmptyState>
      ) : insights.length === 0 ? (
        <EmptyState>
          <h4>No recent transcripts</h4>
          <p>AI insights will appear after earnings calls</p>
        </EmptyState>
      ) : (
        <>
          <TabContainer>
            <Tab 
              className={activeTab === 'summary' ? 'active' : ''}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </Tab>
            <Tab 
              className={activeTab === 'themes' ? 'active' : ''}
              onClick={() => setActiveTab('themes')}
            >
              Themes
            </Tab>
            <Tab 
              className={activeTab === 'sentiment' ? 'active' : ''}
              onClick={() => setActiveTab('sentiment')}
            >
              Sentiment
            </Tab>
          </TabContainer>

          <TabContent>
            {activeTab === 'summary' && (
              <SummarySection>
                {insights.map((insight, index) => (
                  <div key={insight.ticker} style={{ marginBottom: '24px' }}>
                    <h4>{insight.company} ({insight.ticker})</h4>
                    <BulletList>
                      {insight.bullets.map((bullet, bulletIndex) => (
                        <BulletItem key={bulletIndex}>{bullet}</BulletItem>
                      ))}
                    </BulletList>
                    <ViewEventLink onClick={() => console.log('View event for', insight.ticker)}>
                      Go to Event
                    </ViewEventLink>
                  </div>
                ))}
              </SummarySection>
            )}

            {activeTab === 'themes' && (
              <ThemesSection>
                {insights.map((insight, index) => (
                  <div key={insight.ticker} style={{ marginBottom: '24px' }}>
                    <h4>{insight.company} ({insight.ticker})</h4>
                    <ThemeChips>
                      {insight.themes.map((theme, themeIndex) => (
                        <ThemeChip key={themeIndex}>{theme.tag}</ThemeChip>
                      ))}
                    </ThemeChips>
                    <ThemeSnippets>
                      {insight.themes.map((theme, themeIndex) => (
                        <ThemeSnippet key={themeIndex}>
                          <span className="tag">{theme.tag}:</span>
                          <span className="snippet">{theme.snippet}</span>
                          <div className="source">
                            Source: Event {theme.sourceEventId}
                            {theme.ts && ` • ${theme.ts}`}
                          </div>
                        </ThemeSnippet>
                      ))}
                    </ThemeSnippets>
                  </div>
                ))}
              </ThemesSection>
            )}

            {activeTab === 'sentiment' && (
              <SentimentSection>
                {insights.map((insight, index) => (
                  <div key={insight.ticker} style={{ marginBottom: '24px' }}>
                    <h4>{insight.company} ({insight.ticker})</h4>
                    <SentimentMeter>
                      <SentimentBar>
                        <SentimentFill 
                          style={{ 
                            width: `${getSentimentPosition(insight.sentiment.positive, insight.sentiment.negative)}%` 
                          }} 
                        />
                      </SentimentBar>
                    </SentimentMeter>
                    <SentimentLabels>
                      <span>Negative</span>
                      <span>Neutral</span>
                      <span>Positive</span>
                    </SentimentLabels>
                    <SentimentValues>
                      <SentimentValue className="positive">
                        <div className="label">Positive</div>
                        <div className="value">{insight.sentiment.positive}%</div>
                      </SentimentValue>
                      <SentimentValue>
                        <div className="label">Neutral</div>
                        <div className="value">{insight.sentiment.neutral}%</div>
                      </SentimentValue>
                      <SentimentValue className="negative">
                        <div className="label">Negative</div>
                        <div className="value">{insight.sentiment.negative}%</div>
                      </SentimentValue>
                    </SentimentValues>
                    <SentimentNote>
                      Management tone cautious; margin headwinds
                    </SentimentNote>
                  </div>
                ))}
              </SentimentSection>
            )}
          </TabContent>
        </>
      )}
    </Card>
  );
};

export default QualitativeAnalysis;
