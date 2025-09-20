// Events data adapter
export interface EventRow {
  id: string;
  ticker: string;
  company: string;
  datetimeISO: string;     // UTC
  status: "UPCOMING" | "LIVE" | "ENDED";
}

export interface TranscriptInsight {
  ticker: string;
  company: string;
  bullets: string[];       // 5–7 items
  themes: { tag: string; snippet: string; sourceEventId: string; ts?: string }[];
  sentiment: { positive: number; neutral: number; negative: number }; // 0–100
}

// Mock data
const mockEvents: EventRow[] = [
  {
    id: 'event-1',
    ticker: 'AAPL',
    company: 'Apple Inc.',
    datetimeISO: '2024-01-25T21:30:00Z',
    status: 'LIVE'
  },
  {
    id: 'event-2',
    ticker: 'MSFT',
    company: 'Microsoft Corporation',
    datetimeISO: '2024-01-25T22:00:00Z',
    status: 'UPCOMING'
  },
  {
    id: 'event-3',
    ticker: 'GOOGL',
    company: 'Alphabet Inc.',
    datetimeISO: '2024-01-25T23:00:00Z',
    status: 'UPCOMING'
  },
  {
    id: 'event-4',
    ticker: 'TSLA',
    company: 'Tesla, Inc.',
    datetimeISO: '2024-01-24T21:00:00Z',
    status: 'ENDED'
  },
  {
    id: 'event-5',
    ticker: 'AMZN',
    company: 'Amazon.com, Inc.',
    datetimeISO: '2024-01-24T22:30:00Z',
    status: 'ENDED'
  }
];

const mockInsights: TranscriptInsight[] = [
  {
    ticker: 'AAPL',
    company: 'Apple Inc.',
    bullets: [
      'iPhone revenue exceeded expectations with strong demand in emerging markets',
      'Services revenue grew 16% year-over-year, reaching new record high',
      'Mac sales declined 27% due to difficult year-over-year comparison',
      'Apple Pay transactions increased 20% with expanding global adoption',
      'Supply chain constraints have largely been resolved',
      'China market showing signs of recovery with 6% growth in Greater China',
      'R&D investment increased 15% focusing on AI and machine learning'
    ],
    themes: [
      { tag: 'iPhone Performance', snippet: 'Strong iPhone 15 Pro demand driving revenue growth', sourceEventId: 'event-1', ts: '15:30' },
      { tag: 'Services Growth', snippet: 'App Store, iCloud, and Apple Music showing robust growth', sourceEventId: 'event-1', ts: '22:45' },
      { tag: 'China Recovery', snippet: 'Greater China region returning to growth trajectory', sourceEventId: 'event-1', ts: '31:20' },
      { tag: 'AI Investment', snippet: 'Significant R&D investment in AI and machine learning capabilities', sourceEventId: 'event-1', ts: '45:10' }
    ],
    sentiment: { positive: 65, neutral: 25, negative: 10 }
  },
  {
    ticker: 'MSFT',
    company: 'Microsoft Corporation',
    bullets: [
      'Azure revenue growth accelerated to 29% year-over-year',
      'Office 365 commercial revenue increased 18% with strong enterprise adoption',
      'LinkedIn revenue grew 8% with record engagement levels',
      'Windows revenue declined 12% due to PC market headwinds',
      'Gaming revenue increased 7% driven by Xbox Game Pass growth',
      'AI integration across products showing early positive signals',
      'Enterprise security solutions seeing strong demand'
    ],
    themes: [
      { tag: 'Azure Growth', snippet: 'Cloud infrastructure services driving strong revenue growth', sourceEventId: 'event-2', ts: '12:15' },
      { tag: 'AI Integration', snippet: 'Copilot and AI features gaining enterprise traction', sourceEventId: 'event-2', ts: '28:30' },
      { tag: 'Enterprise Security', snippet: 'Growing demand for Microsoft security solutions', sourceEventId: 'event-2', ts: '41:20' }
    ],
    sentiment: { positive: 70, neutral: 20, negative: 10 }
  }
];

export async function getRecentEvents(tickers: string[]): Promise<EventRow[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const filteredEvents = mockEvents.filter(event => 
    tickers.length === 0 || tickers.includes(event.ticker)
  );
  
  // Sort by datetime (most recent first)
  return filteredEvents.sort((a, b) => 
    new Date(b.datetimeISO).getTime() - new Date(a.datetimeISO).getTime()
  );
}

export async function getRecentTranscriptInsights(tickers: string[]): Promise<TranscriptInsight[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const filteredInsights = mockInsights.filter(insight => 
    tickers.length === 0 || tickers.includes(insight.ticker)
  );
  
  return filteredInsights;
}

export async function getEventDetails(eventId: string): Promise<EventRow | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const event = mockEvents.find(e => e.id === eventId);
  return event || null;
}

// TODO: Replace with real API calls
// - Integrate with earnings calendar APIs (Alpha Vantage, IEX Cloud, etc.)
// - Add real-time event status updates via webhooks
// - Implement transcript processing and AI analysis
// - Add caching for event data with appropriate TTL
