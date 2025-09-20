// Mock insights data
module.exports = [
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
