import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMarketSnapshot } from '../../lib/data/adapters/market';
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

const AddButton = styled.button`
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

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing[4]};
  background: ${props => props.theme.colors.white};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.black};
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

const WatchlistItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
`;

const WatchlistItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing[3]};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.sm};
  background: ${props => props.theme.colors.panel};
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.theme.colors.muted};
    box-shadow: ${props => props.theme.shadows.sm};
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  
  .company {
    font-size: ${props => props.theme.typography.fontSize.sm};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    color: ${props => props.theme.colors.heading};
    margin: 0 0 ${props => props.theme.spacing[1]} 0;
  }
  
  .ticker {
    font-size: ${props => props.theme.typography.fontSize.xs};
    color: ${props => props.theme.colors.muted};
    margin: 0;
  }
`;

const PriceInfo = styled.div`
  text-align: right;
  
  .price {
    font-size: ${props => props.theme.typography.fontSize.sm};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    color: ${props => props.theme.colors.heading};
    margin: 0 0 ${props => props.theme.spacing[1]} 0;
  }
  
  .change {
    font-size: ${props => props.theme.typography.fontSize.xs};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    
    &.positive {
      color: ${props => props.theme.colors.success};
    }
    
    &.negative {
      color: ${props => props.theme.colors.error};
    }
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.muted};
  cursor: pointer;
  padding: ${props => props.theme.spacing[1]};
  margin-left: ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.theme.colors.divider};
    color: ${props => props.theme.colors.error};
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

const Watchlist = ({ tickers, onTickersChange }) => {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Default watchlist items
  const defaultTickers = ['AAPL', 'MSFT', 'TSLA', 'GOOGL'];

  const loadWatchlistData = async () => {
    setLoading(true);
    try {
      const currentTickers = tickers.length > 0 ? tickers : defaultTickers;
      const cacheKey = `watchlist_${currentTickers.join(',')}`;
      let cachedData = cache.get(cacheKey);
      
      if (!cachedData) {
        cachedData = await getMarketSnapshot(currentTickers);
        cache.set(cacheKey, cachedData, 60000); // 1 minute cache
      }
      
      setWatchlistItems(cachedData);
    } catch (error) {
      console.error('Failed to load watchlist data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWatchlistData();
  }, [tickers]);

  const handleRemoveItem = (tickerToRemove) => {
    const newTickers = tickers.filter(ticker => ticker !== tickerToRemove);
    onTickersChange(newTickers);
  };

  const handleAddItem = () => {
    // This would typically open a search modal
    // For now, we'll just show an alert
    alert('Add company functionality would open a search modal here');
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

  const filteredItems = watchlistItems.filter(item =>
    item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h2>Watchlist</h2>
        </CardHeader>
        <div className="skeleton" style={{ height: '300px', borderRadius: '8px' }} />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2>Watchlist</h2>
        <AddButton onClick={handleAddItem}>
          Add Company
        </AddButton>
      </CardHeader>
      
      <SearchInput
        type="text"
        placeholder="Search companies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {filteredItems.length === 0 ? (
        <EmptyState>
          <h3>No companies in watchlist</h3>
          <p>Add companies to track their performance</p>
        </EmptyState>
      ) : (
        <WatchlistItems>
          {filteredItems.map((item) => (
            <WatchlistItem key={item.ticker}>
              <ItemInfo>
                <div className="company">{item.company}</div>
                <div className="ticker">{item.ticker}</div>
              </ItemInfo>
              <PriceInfo>
                <div className="price">{formatPrice(item.price)}</div>
                <div className={`change ${getChangeClass(item.change)}`}>
                  {formatChange(item.change, item.changePercent)}
                </div>
              </PriceInfo>
              <RemoveButton onClick={() => handleRemoveItem(item.ticker)}>
                ×
              </RemoveButton>
            </WatchlistItem>
          ))}
        </WatchlistItems>
      )}
    </Card>
  );
};

export default Watchlist;