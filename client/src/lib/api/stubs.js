// API stubs for real-time data integration
// These endpoints currently return mock data but are designed to be easily replaced with real APIs

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

// Events API stubs
export const eventsAPI = {
  // Get recent events for specified tickers
  getRecentEvents: async (tickers = []) => {
    const tickerParam = tickers.length > 0 ? `?tickers=${tickers.join(',')}` : '';
    return apiCall(`/events/recent${tickerParam}`);
  },

  // Get event details by ID
  getEventDetails: async (eventId) => {
    return apiCall(`/events/${eventId}`);
  },

  // Get live events (for real-time updates)
  getLiveEvents: async () => {
    return apiCall('/events/live');
  },

  // Subscribe to event updates via WebSocket
  subscribeToEventUpdates: (callback) => {
    // TODO: Implement WebSocket connection
    console.log('WebSocket subscription to event updates not implemented yet');
    return () => console.log('WebSocket subscription closed');
  }
};

// Insights API stubs
export const insightsAPI = {
  // Get recent transcript insights for specified tickers
  getRecentInsights: async (tickers = []) => {
    const tickerParam = tickers.length > 0 ? `?tickers=${tickers.join(',')}` : '';
    return apiCall(`/insights/recent${tickerParam}`);
  },

  // Refresh AI insights (triggers background processing)
  refreshInsights: async (tickers = []) => {
    const tickerParam = tickers.length > 0 ? `?tickers=${tickers.join(',')}` : '';
    return apiCall(`/insights/refresh${tickerParam}`, {
      method: 'POST'
    });
  },

  // Get insights for specific event
  getEventInsights: async (eventId) => {
    return apiCall(`/insights/event/${eventId}`);
  }
};

// Fundamentals API stubs
export const fundamentalsAPI = {
  // Get quarterly KPIs for specified tickers
  getQuarterlyKPIs: async (tickers = []) => {
    const tickerParam = tickers.length > 0 ? `?tickers=${tickers.join(',')}` : '';
    return apiCall(`/fundamentals/kpis${tickerParam}`);
  },

  // Get specific KPI trend
  getKPITrend: async (ticker, kpi, quarters = 6) => {
    return apiCall(`/fundamentals/trend/${ticker}/${kpi}?quarters=${quarters}`);
  },

  // Get guidance data
  getGuidance: async (tickers = []) => {
    const tickerParam = tickers.length > 0 ? `?tickers=${tickers.join(',')}` : '';
    return apiCall(`/fundamentals/guidance${tickerParam}`);
  }
};

// Market API stubs
export const marketAPI = {
  // Get market snapshot for specified tickers
  getSnapshot: async (tickers = []) => {
    const tickerParam = tickers.length > 0 ? `?tickers=${tickers.join(',')}` : '';
    return apiCall(`/market/snapshot${tickerParam}`);
  },

  // Get price series for specific ticker
  getSeries: async (ticker, range = '1M') => {
    return apiCall(`/market/series/${ticker}?range=${range}`);
  },

  // Get multiple price series
  getMultipleSeries: async (tickers = [], range = '1M') => {
    const tickerParam = tickers.length > 0 ? `?tickers=${tickers.join(',')}` : '';
    return apiCall(`/market/series${tickerParam}&range=${range}`);
  },

  // Subscribe to real-time price updates
  subscribeToPriceUpdates: (tickers, callback) => {
    // TODO: Implement WebSocket connection for real-time prices
    console.log('WebSocket subscription to price updates not implemented yet');
    return () => console.log('WebSocket subscription closed');
  }
};

// Companies API stubs
export const companiesAPI = {
  // Search companies
  searchCompanies: async (query) => {
    return apiCall(`/companies/search?q=${encodeURIComponent(query)}`);
  },

  // Get company profile
  getCompanyProfile: async (ticker) => {
    return apiCall(`/companies/${ticker}`);
  },

  // Get company financials
  getCompanyFinancials: async (ticker) => {
    return apiCall(`/companies/${ticker}/financials`);
  }
};

// Analytics API stubs
export const analyticsAPI = {
  // Track user events
  trackEvent: async (event, properties = {}) => {
    return apiCall('/analytics/track', {
      method: 'POST',
      body: JSON.stringify({
        event,
        properties,
        timestamp: Date.now()
      })
    });
  },

  // Track dashboard interactions
  trackDashboardView: async (tickers = []) => {
    return analyticsAPI.trackEvent('dashboard_viewed', { tickers });
  },

  trackRefresh: async (component, tickers = []) => {
    return analyticsAPI.trackEvent(`${component}_refreshed`, { tickers });
  }
};

// WebSocket connection manager
export class WebSocketManager {
  constructor() {
    this.connections = new Map();
  }

  connect(endpoint, onMessage, onError) {
    const wsUrl = `${API_BASE_URL.replace('http', 'ws')}${endpoint}`;
    const ws = new WebSocket(wsUrl);
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (onError) onError(error);
    };
    
    this.connections.set(endpoint, ws);
    return ws;
  }

  disconnect(endpoint) {
    const ws = this.connections.get(endpoint);
    if (ws) {
      ws.close();
      this.connections.delete(endpoint);
    }
  }

  disconnectAll() {
    this.connections.forEach((ws) => ws.close());
    this.connections.clear();
  }
}

// Create singleton instance
export const wsManager = new WebSocketManager();

// TODO: Replace mock implementations with real API calls
// - Add proper error handling and retry logic
// - Implement WebSocket connections for real-time data
// - Add authentication headers
// - Add request/response interceptors
// - Add caching strategies
// - Add rate limiting
// - Add offline support
