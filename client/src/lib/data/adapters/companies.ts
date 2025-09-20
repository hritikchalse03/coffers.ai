// Companies data adapter
export interface CompanyProfile {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
  marketCap: number;
  employees: number;
  website: string;
  description: string;
}

export interface CompanySearchResult {
  ticker: string;
  name: string;
  sector: string;
  marketCap: number;
}

// Mock data
const mockCompanies: CompanyProfile[] = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    marketCap: 3000000000000,
    employees: 164000,
    website: 'https://apple.com',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.'
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    industry: 'Software',
    marketCap: 2800000000000,
    employees: 221000,
    website: 'https://microsoft.com',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.'
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Technology',
    industry: 'Internet Content & Information',
    marketCap: 1800000000000,
    employees: 190000,
    website: 'https://alphabet.com',
    description: 'Alphabet Inc. provides online advertising services in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.'
  },
  {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    sector: 'Consumer Discretionary',
    industry: 'Auto Manufacturers',
    marketCap: 800000000000,
    employees: 127000,
    website: 'https://tesla.com',
    description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.'
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    sector: 'Consumer Discretionary',
    industry: 'Internet Retail',
    marketCap: 1500000000000,
    employees: 1540000,
    website: 'https://amazon.com',
    description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally.'
  }
];

export async function searchCompanies(query: string): Promise<CompanySearchResult[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const results = mockCompanies
    .filter(company => 
      company.name.toLowerCase().includes(query.toLowerCase()) ||
      company.ticker.toLowerCase().includes(query.toLowerCase())
    )
    .map(company => ({
      ticker: company.ticker,
      name: company.name,
      sector: company.sector,
      marketCap: company.marketCap
    }));
  
  return results;
}

export async function getCompanyProfile(ticker: string): Promise<CompanyProfile | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const company = mockCompanies.find(c => c.ticker === ticker);
  return company || null;
}

// TODO: Replace with real API calls
// - Integrate with financial data providers (Alpha Vantage, Yahoo Finance, etc.)
// - Add real-time company search
// - Cache company profiles with TTL
