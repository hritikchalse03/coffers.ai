import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRecentEarningsCalls } from '../../lib/data/adapters/events';
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

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`;

const EventItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.sm};
  background: ${props => props.theme.colors.white};
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.theme.colors.muted};
    box-shadow: ${props => props.theme.shadows.sm};
  }
`;

const EventInfo = styled.div`
  flex: 1;
  
  h3 {
    font-size: ${props => props.theme.typography.fontSize.base};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    color: ${props => props.theme.colors.heading};
    margin: 0 0 ${props => props.theme.spacing[1]} 0;
  }
  
  p {
    font-size: ${props => props.theme.typography.fontSize.sm};
    color: ${props => props.theme.colors.muted};
    margin: 0 0 ${props => props.theme.spacing[1]} 0;
  }
  
  .time {
    font-size: ${props => props.theme.typography.fontSize.xs};
    color: ${props => props.theme.colors.muted};
  }
`;

const EventStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const StatusBadge = styled.span`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &.live {
    background: #FEF2F2;
    color: #DC2626;
    border: 1px solid #FECACA;
  }
  
  &.upcoming {
    background: #F0F9FF;
    color: #2563EB;
    border: 1px solid #BFDBFE;
  }
  
  &.ended {
    background: #F3F4F6;
    color: #6B7280;
    border: 1px solid #D1D5DB;
  }
`;

const ActionButton = styled.button`
  background: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: ${props => props.theme.colors.muted};
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

const RecentEarningsCalls = ({ tickers }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadEvents = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const cacheKey = `events_${tickers.join(',')}`;
      let cachedEvents = cache.get(cacheKey);
      
      if (!cachedEvents || isRefresh) {
        cachedEvents = await getRecentEarningsCalls(tickers);
        cache.set(cacheKey, cachedEvents, 30000); // 30 second cache
      }
      
      setEvents(cachedEvents);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [tickers]);

  const handleRefresh = () => {
    loadEvents(true);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'live': return 'live';
      case 'upcoming': return 'upcoming';
      case 'ended': return 'ended';
      default: return 'upcoming';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h2>Recent Earnings Calls</h2>
        </CardHeader>
        <div className="skeleton" style={{ height: '200px', borderRadius: '8px' }} />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2>Recent Earnings Calls</h2>
        <RefreshButton onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </RefreshButton>
      </CardHeader>
      
      {events.length === 0 ? (
        <EmptyState>
          <h3>No earnings calls found</h3>
          <p>Add companies to your watchlist to see their earnings calls</p>
        </EmptyState>
      ) : (
        <EventsList>
          {events.map((event) => (
            <EventItem key={event.id}>
              <EventInfo>
                <h3>{event.companyName} ({event.company})</h3>
                <p>{event.title}</p>
                <div className="time">
                  {formatTime(event.startTime)}
                  {event.attendees > 0 && ` • ${event.attendees.toLocaleString()} attendees`}
                </div>
              </EventInfo>
              <EventStatus>
                <StatusBadge className={getStatusClass(event.status)}>
                  {event.status}
                </StatusBadge>
                <ActionButton>
                  View Event
                </ActionButton>
              </EventStatus>
            </EventItem>
          ))}
        </EventsList>
      )}
    </Card>
  );
};

export default RecentEarningsCalls;