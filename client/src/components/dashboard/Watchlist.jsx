import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { searchCompanies } from '../../lib/data/adapters/companies';
import { getSnapshot } from '../../lib/data/adapters/market';
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

const AddButton = styled.button`
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
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  background: white;
  color: #374151;

  &:focus {
    outline: 2px solid #3B82F6;
    outline-offset: 2px;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

const SearchResult = styled.div`
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid #E5E7EB;
  transition: background 0.2s;

  &:hover {
    background: #F9FAFB;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ResultTicker = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
`;

const ResultName = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const WatchlistItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const WatchlistItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #F3F4F6;
    border-color: #D1D5DB;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTicker = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
`;

const ItemPrice = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const ItemChange = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-right: 8px;

  &.positive {
    color: #059669;
  }

  &.negative {
    color: #DC2626;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #FEE2E2;
    color: #DC2626;
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
  padding: 20px;
  color: #6B7280;
`;

// Cached versions
const getCachedSnapshot = withCache(
  getSnapshot,
  (tickers) => createCacheKey('watchlist-snapshot', tickers.join(',')),
  CACHE_TTL.SHORT
);

const getCachedSearchCompanies = withCache(
  searchCompanies,
  (query) => createCacheKey('company-search', query),
  CACHE_TTL.MEDIUM
);

const Watchlist = ({ tickers = [], onTickersChange }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Pre-seeded watchlist for demo
  const defaultWatchlist = [
    { ticker: 'AAPL', name: 'Apple Inc.', addedAt: new Date().toISOString() },
    { ticker: 'MSFT', name: 'Microsoft Corporation', addedAt: new Date().toISOString() },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', addedAt: new Date().toISOString() }
  ];

  useEffect(() => {
    // Load watchlist from localStorage or use default
    const savedWatchlist = localStorage.getItem('coffers-watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    } else {
      setWatchlist(defaultWatchlist);
      localStorage.setItem('coffers-watchlist', JSON.stringify(defaultWatchlist));
    }
  }, []);

  useEffect(() => {
    // Update parent component with current tickers
    const currentTickers = watchlist.map(item => item.ticker);
    if (onTickersChange) {
      onTickersChange(currentTickers);
    }
  }, [watchlist, onTickersChange]);

  const loadMarketData = async () => {
    if (watchlist.length === 0) return;

    setLoading(true);
    try {
      const tickers = watchlist.map(item => item.ticker);
      const snapshots = await getCachedSnapshot(tickers);
      
      // Update watchlist with current prices
      const updatedWatchlist = watchlist.map(item => {
        const snapshot = snapshots.find(s => s.ticker === item.ticker);
        return {
          ...item,
          price: snapshot?.price || 0,
          change1D: snapshot?.change1D || 0
        };
      });
      
      setWatchlist(updatedWatchlist);
    } catch (err) {
      console.error('Error loading market data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarketData();
  }, [watchlist.length]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setSearchResults([]);
      setShowSearch(false);
      return;
    }

    setSearchLoading(true);
    try {
      const results = await getCachedSearchCompanies(query);
      setSearchResults(results);
      setShowSearch(true);
    } catch (err) {
      console.error('Error searching companies:', err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleAddToWatchlist = (ticker, name) => {
    const newItem = {
      ticker,
      name,
      addedAt: new Date().toISOString()
    };
    
    const updatedWatchlist = [...watchlist, newItem];
    setWatchlist(updatedWatchlist);
    localStorage.setItem('coffers-watchlist', JSON.stringify(updatedWatchlist));
    
    setSearchQuery('');
    setSearchResults([]);
    setShowSearch(false);
  };

  const handleRemoveFromWatchlist = (ticker) => {
    const updatedWatchlist = watchlist.filter(item => item.ticker !== ticker);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('coffers-watchlist', JSON.stringify(updatedWatchlist));
  };

  const formatPrice = (price) => {
    return price ? `$${price.toFixed(2)}` : 'Loading...';
  };

  const formatChange = (change) => {
    if (change === undefined || change === null) return '';
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const getChangeClass = (change) => {
    if (change === undefined || change === null) return '';
    return change >= 0 ? 'positive' : 'negative';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
        <AddButton onClick={() => setShowSearch(!showSearch)}>
          Add
        </AddButton>
      </CardHeader>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search companies..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {showSearch && (
          <SearchResults>
            {searchLoading ? (
              <div style={{ padding: '12px', textAlign: 'center', color: '#6B7280' }}>
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result) => (
                <SearchResult
                  key={result.ticker}
                  onClick={() => handleAddToWatchlist(result.ticker, result.name)}
                >
                  <ResultTicker>{result.ticker}</ResultTicker>
                  <ResultName>{result.name}</ResultName>
                </SearchResult>
              ))
            ) : searchQuery.length >= 2 ? (
              <div style={{ padding: '12px', textAlign: 'center', color: '#6B7280' }}>
                No companies found
              </div>
            ) : null}
          </SearchResults>
        )}
      </SearchContainer>

      {loading ? (
        <LoadingState>Loading market data...</LoadingState>
      ) : watchlist.length === 0 ? (
        <EmptyState>
          <h4>No companies in watchlist</h4>
          <p>Add companies to track their performance</p>
        </EmptyState>
      ) : (
        <WatchlistItems>
          {watchlist.map((item) => (
            <WatchlistItem key={item.ticker}>
              <ItemInfo>
                <ItemTicker>{item.ticker}</ItemTicker>
                <ItemPrice>{formatPrice(item.price)}</ItemPrice>
              </ItemInfo>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {item.change1D !== undefined && (
                  <ItemChange className={getChangeClass(item.change1D)}>
                    {formatChange(item.change1D)}
                  </ItemChange>
                )}
                <RemoveButton
                  onClick={() => handleRemoveFromWatchlist(item.ticker)}
                  title="Remove from watchlist"
                >
                  ×
                </RemoveButton>
              </div>
            </WatchlistItem>
          ))}
        </WatchlistItems>
      )}
    </Card>
  );
};

export default Watchlist;
