// Events data adapter for earnings calls and transcripts
export const getRecentEarningsCalls = async (tickers = []) => {
  // Mock data - replace with real API call
  const mockEvents = [
    {
      id: '1',
      company: 'AAPL',
      companyName: 'Apple Inc.',
      title: 'Q4 2024 Earnings Call',
      type: 'earnings',
      status: 'live',
      startTime: new Date(),
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      attendees: 1247,
      description: 'Apple reports Q4 2024 results with record revenue of $94.9B.',
      transcript: {
        summary: 'Strong iPhone sales drive record revenue. Services growth continues. China market shows recovery.',
        keyMoments: [
          { timestamp: '00:15:30', text: 'iPhone revenue up 8% year-over-year', sentiment: 'positive' },
          { timestamp: '00:23:45', text: 'Services revenue reaches new high of $22.3B', sentiment: 'positive' },
          { timestamp: '00:31:20', text: 'China market showing signs of recovery', sentiment: 'neutral' }
        ]
      }
    },
    {
      id: '2',
      company: 'MSFT',
      companyName: 'Microsoft Corporation',
      title: 'Q4 2024 Earnings Call',
      type: 'earnings',
      status: 'upcoming',
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      attendees: 0,
      description: 'Microsoft reports Q4 2024 results with focus on AI and cloud growth.',
      transcript: null
    },
    {
      id: '3',
      company: 'TSLA',
      companyName: 'Tesla, Inc.',
      title: 'Q4 2024 Earnings Call',
      type: 'earnings',
      status: 'ended',
      startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      endTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      attendees: 2156,
      description: 'Tesla reports Q4 2024 results with focus on production and delivery numbers.',
      transcript: {
        summary: 'Production targets met. Delivery numbers exceed expectations. FSD progress discussed.',
        keyMoments: [
          { timestamp: '00:12:15', text: 'Production of 1.8M vehicles in Q4', sentiment: 'positive' },
          { timestamp: '00:28:30', text: 'FSD Beta showing promising results', sentiment: 'positive' },
          { timestamp: '00:45:20', text: 'Supply chain challenges remain', sentiment: 'negative' }
        ]
      }
    }
  ];

  // Filter by tickers if provided
  if (tickers.length > 0) {
    return mockEvents.filter(event => tickers.includes(event.company));
  }

  return mockEvents;
};

export const getEventTranscript = async (eventId) => {
  // Mock transcript data
  const mockTranscript = {
    id: eventId,
    fullText: 'This is a mock transcript of the earnings call...',
    segments: [
      { timestamp: '00:00:00', speaker: 'CEO', text: 'Good afternoon and welcome to our Q4 earnings call...' },
      { timestamp: '00:02:30', speaker: 'CFO', text: 'Let me walk you through our financial results...' }
    ],
    summary: 'Strong quarter with record revenue and margin expansion.',
    sentiment: { positive: 65, neutral: 25, negative: 10 }
  };

  return mockTranscript;
};
