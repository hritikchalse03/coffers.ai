import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRecentEvents } from '../../lib/data/adapters/events';
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

const FilterRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;

  &:focus {
    outline: 2px solid #3B82F6;
    outline-offset: 2px;
  }
`;

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EventItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }
`;

const EventInfo = styled.div`
  flex: 1;
`;

const EventCompany = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
`;

const EventDetails = styled.div`
  color: #6B7280;
  font-size: 14px;
`;

const EventStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  &.live {
    background: #FEE2E2;
    color: #DC2626;
  }

  &.upcoming {
    background: #F3F4F6;
    color: #6B7280;
  }

  &.ended {
    background: #E5E7EB;
    color: #374151;
  }
`;

const LiveDot = styled.div`
  width: 8px;
  height: 8px;
  background: #DC2626;
  border-radius: 50%;
  animation: pulse 2s infinite;
  margin-right: 6px;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const ActionButton = styled.button`
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

  &.secondary {
    background: white;
    color: #374151;
    border: 1px solid #D1D5DB;

    &:hover {
      background: #F9FAFB;
      border-color: #9CA3AF;
    }
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

// Cached version of getRecentEvents
const getCachedRecentEvents = withCache(
  getRecentEvents,
  (tickers) => createCacheKey('recent-events', tickers.join(',')),
  CACHE_TTL.SHORT
);

const RecentEarningsCalls = ({ tickers = [], onRefresh }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('datetime');

  const loadEvents = async () => {
    if (tickers.length === 0) {
      setEvents([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getCachedRecentEvents(tickers);
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [tickers]);

  const handleRefresh = () => {
    loadEvents();
    if (onRefresh) onRefresh();
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  const filteredEvents = events.filter(event => {
    if (statusFilter === 'ALL') return true;
    return event.status === statusFilter;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'datetime') {
      return new Date(b.datetimeISO) - new Date(a.datetimeISO);
    }
    if (sortBy === 'status') {
      const statusOrder = { 'LIVE': 0, 'UPCOMING': 1, 'ENDED': 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return 0;
  });

  const handleViewEvent = (eventId) => {
    // TODO: Navigate to event details page
    console.log('View event:', eventId);
  };

  const handleOpenTranscript = (eventId) => {
    // TODO: Open transcript modal
    console.log('Open transcript:', eventId);
  };

  const handlePinEvent = (eventId) => {
    // TODO: Pin/unpin event
    console.log('Pin event:', eventId);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Earnings Calls</CardTitle>
        </CardHeader>
        <LoadingState>Loading events...</LoadingState>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Earnings Calls</CardTitle>
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
        <CardTitle>Recent Earnings Calls</CardTitle>
        <RefreshButton onClick={handleRefresh} disabled={loading}>
          Refresh
        </RefreshButton>
      </CardHeader>

      {tickers.length === 0 ? (
        <EmptyState>
          <h4>No events</h4>
          <p>Add tickers to your Watchlist to see earnings calls</p>
        </EmptyState>
      ) : (
        <>
          <FilterRow>
            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="LIVE">Live</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="ENDED">Ended</option>
            </FilterSelect>
            <FilterSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="datetime">Sort by Date</option>
              <option value="status">Sort by Status</option>
            </FilterSelect>
          </FilterRow>

          <EventsList>
            {sortedEvents.map((event) => {
              const { date, time } = formatDateTime(event.datetimeISO);
              const isLive = event.status === 'LIVE';
              
              return (
                <EventItem key={event.id}>
                  <EventInfo>
                    <EventCompany>
                      {event.company} ({event.ticker})
                    </EventCompany>
                    <EventDetails>
                      {date} • {time} EST
                    </EventDetails>
                  </EventInfo>
                  <EventStatus>
                    <StatusBadge className={getStatusClass(event.status)}>
                      {isLive && <LiveDot />}
                      {event.status}
                    </StatusBadge>
                    <ActionButton
                      onClick={() => handleViewEvent(event.id)}
                    >
                      View Event
                    </ActionButton>
                    <ActionButton
                      className="secondary"
                      onClick={() => handleOpenTranscript(event.id)}
                    >
                      Transcript
                    </ActionButton>
                    <ActionButton
                      className="secondary"
                      onClick={() => handlePinEvent(event.id)}
                    >
                      Pin
                    </ActionButton>
                  </EventStatus>
                </EventItem>
              );
            })}
          </EventsList>
        </>
      )}
    </Card>
  );
};

export default RecentEarningsCalls;
