// Simple Express server for API stubs
// This provides mock endpoints that can be easily replaced with real APIs

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Import mock data
const mockEvents = require('./data/mockEvents');
const mockInsights = require('./data/mockInsights');
const mockKPIs = require('./data/mockKPIs');
const mockMarket = require('./data/mockMarket');
const mockCompanies = require('./data/mockCompanies');

// Events endpoints
app.get('/api/events/recent', (req, res) => {
  const { tickers } = req.query;
  const tickerList = tickers ? tickers.split(',') : [];
  
  let events = mockEvents;
  if (tickerList.length > 0) {
    events = events.filter(event => tickerList.includes(event.ticker));
  }
  
  res.json({
    data: events,
    success: true,
    timestamp: Date.now()
  });
});

app.get('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const event = mockEvents.find(e => e.id === id);
  
  if (!event) {
    return res.status(404).json({
      error: 'Event not found',
      success: false
    });
  }
  
  res.json({
    data: event,
    success: true,
    timestamp: Date.now()
  });
});

app.get('/api/events/live', (req, res) => {
  const liveEvents = mockEvents.filter(event => event.status === 'LIVE');
  
  res.json({
    data: liveEvents,
    success: true,
    timestamp: Date.now()
  });
});

// Insights endpoints
app.get('/api/insights/recent', (req, res) => {
  const { tickers } = req.query;
  const tickerList = tickers ? tickers.split(',') : [];
  
  let insights = mockInsights;
  if (tickerList.length > 0) {
    insights = insights.filter(insight => tickerList.includes(insight.ticker));
  }
  
  res.json({
    data: insights,
    success: true,
    timestamp: Date.now()
  });
});

app.post('/api/insights/refresh', (req, res) => {
  const { tickers } = req.query;
  
  // Simulate AI processing delay
  setTimeout(() => {
    res.json({
      message: 'Insights refresh initiated',
      success: true,
      timestamp: Date.now()
    });
  }, 2000);
});

app.get('/api/insights/event/:eventId', (req, res) => {
  const { eventId } = req.params;
  const insight = mockInsights.find(i => i.sourceEventId === eventId);
  
  if (!insight) {
    return res.status(404).json({
      error: 'Insights not found for this event',
      success: false
    });
  }
  
  res.json({
    data: insight,
    success: true,
    timestamp: Date.now()
  });
});

// Fundamentals endpoints
app.get('/api/fundamentals/kpis', (req, res) => {
  const { tickers } = req.query;
  const tickerList = tickers ? tickers.split(',') : [];
  
  let kpis = mockKPIs;
  if (tickerList.length > 0) {
    kpis = kpis.filter(kpi => tickerList.includes(kpi.ticker));
  }
  
  res.json({
    data: kpis,
    success: true,
    timestamp: Date.now()
  });
});

app.get('/api/fundamentals/trend/:ticker/:kpi', (req, res) => {
  const { ticker, kpi } = req.params;
  const { quarters = 6 } = req.query;
  
  const kpiBlock = mockKPIs.find(k => k.ticker === ticker);
  if (!kpiBlock || !kpiBlock.kpis[kpi]) {
    return res.status(404).json({
      error: 'KPI data not found',
      success: false
    });
  }
  
  const trend = kpiBlock.kpis[kpi].slice(-parseInt(quarters));
  
  res.json({
    data: trend,
    success: true,
    timestamp: Date.now()
  });
});

app.get('/api/fundamentals/guidance', (req, res) => {
  const { tickers } = req.query;
  const tickerList = tickers ? tickers.split(',') : [];
  
  // Mock guidance data
  const guidance = mockKPIs.map(kpi => ({
    ticker: kpi.ticker,
    company: kpi.company,
    currentGuidance: kpi.kpis.guidanceDelta[kpi.kpis.guidanceDelta.length - 1]?.value || 0,
    previousGuidance: 0,
    guidanceChange: kpi.kpis.guidanceDelta[kpi.kpis.guidanceDelta.length - 1]?.value || 0
  }));
  
  let filteredGuidance = guidance;
  if (tickerList.length > 0) {
    filteredGuidance = guidance.filter(g => tickerList.includes(g.ticker));
  }
  
  res.json({
    data: filteredGuidance,
    success: true,
    timestamp: Date.now()
  });
});

// Market endpoints
app.get('/api/market/snapshot', (req, res) => {
  const { tickers } = req.query;
  const tickerList = tickers ? tickers.split(',') : [];
  
  let snapshots = mockMarket.snapshots;
  if (tickerList.length > 0) {
    snapshots = snapshots.filter(s => tickerList.includes(s.ticker));
  }
  
  res.json({
    data: snapshots,
    success: true,
    timestamp: Date.now()
  });
});

app.get('/api/market/series/:ticker', (req, res) => {
  const { ticker } = req.params;
  const { range = '1M' } = req.query;
  
  const series = mockMarket.generatePriceSeries(ticker, range);
  
  res.json({
    data: series,
    success: true,
    timestamp: Date.now()
  });
});

app.get('/api/market/series', (req, res) => {
  const { tickers, range = '1M' } = req.query;
  const tickerList = tickers ? tickers.split(',') : [];
  
  const series = {};
  tickerList.forEach(ticker => {
    series[ticker] = mockMarket.generatePriceSeries(ticker, range);
  });
  
  res.json({
    data: series,
    success: true,
    timestamp: Date.now()
  });
});

// Companies endpoints
app.get('/api/companies/search', (req, res) => {
  const { q } = req.query;
  
  if (!q || q.length < 2) {
    return res.json({
      data: [],
      success: true,
      timestamp: Date.now()
    });
  }
  
  const results = mockCompanies.filter(company => 
    company.name.toLowerCase().includes(q.toLowerCase()) ||
    company.ticker.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json({
    data: results,
    success: true,
    timestamp: Date.now()
  });
});

app.get('/api/companies/:ticker', (req, res) => {
  const { ticker } = req.params;
  const company = mockCompanies.find(c => c.ticker === ticker);
  
  if (!company) {
    return res.status(404).json({
      error: 'Company not found',
      success: false
    });
  }
  
  res.json({
    data: company,
    success: true,
    timestamp: Date.now()
  });
});

app.get('/api/companies/:ticker/financials', (req, res) => {
  const { ticker } = req.params;
  const kpi = mockKPIs.find(k => k.ticker === ticker);
  
  if (!kpi) {
    return res.status(404).json({
      error: 'Financial data not found',
      success: false
    });
  }
  
  res.json({
    data: kpi,
    success: true,
    timestamp: Date.now()
  });
});

// Analytics endpoints
app.post('/api/analytics/track', (req, res) => {
  const { event, properties, timestamp } = req.body;
  
  // In a real implementation, this would send to analytics service
  console.log('Analytics event:', { event, properties, timestamp });
  
  res.json({
    success: true,
    timestamp: Date.now()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: Date.now(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    success: false,
    timestamp: Date.now()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    success: false,
    timestamp: Date.now()
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

module.exports = app;
