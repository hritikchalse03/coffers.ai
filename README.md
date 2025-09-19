# coffers.ai

A comprehensive financial research platform for live earnings calls and real-time transcripts from 13,000+ public companies.

## 🚀 Features

- **Live Audio & Transcripts**: Access live earnings calls with real-time transcription
- **Powerful Search**: Search across all transcripts simultaneously
- **AI-Powered Insights**: Get instant highlights, sentiment analysis, and key topic extraction
- **Real-time Updates**: Live price updates and event notifications
- **User Authentication**: Secure user registration and login system
- **Watchlists**: Create and manage company watchlists
- **Responsive Design**: Modern, mobile-first interface

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **API**: RESTful API design
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/coffers-ai.git
cd coffers-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: production

### Deploy to GitHub

1. Create a new repository on GitHub
2. Add remote origin:
```bash
git remote add origin https://github.com/yourusername/atnt-platform.git
```

3. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

## 📁 Project Structure

```
coffers-ai/
├── index.html              # Main landing page
├── server.js               # Express.js server
├── package.json            # Dependencies and scripts
├── vercel.json             # Vercel deployment config
├── pages/                  # Additional HTML pages
│   ├── company.html
│   ├── dashboard.html
│   ├── events.html
│   ├── login.html
│   ├── profile.html
│   ├── register.html
│   ├── search.html
│   └── transcript.html
├── js/                     # JavaScript files
│   └── api.js
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Profile (Protected)
- `GET /api/user/profile` - Get user profile
- `POST /api/user/profile` - Create/update user profile

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:symbol` - Get specific company details

### Events
- `GET /api/events` - Get all events
- `GET /api/events?status=live` - Get live events

### Search
- `GET /api/search?q=query` - Search companies and transcripts

### Watchlists (Protected)
- `GET /api/watchlists` - Get user watchlists
- `POST /api/watchlists` - Create new watchlist

## 🎨 Design Features

- **Dark Theme**: Professional dark interface
- **Responsive**: Mobile-first design
- **Modern UI**: Clean, Quartr-inspired design
- **Real-time Updates**: Live price and event updates
- **Interactive Elements**: Hover effects and smooth transitions

## 🔒 Security

- Password hashing with bcryptjs
- JWT token authentication
- CORS enabled for cross-origin requests
- Input validation and sanitization

## 📈 Performance

- Static file serving for optimal performance
- Efficient API design
- Real-time price updates every 30 seconds
- Optimized for Vercel deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@coffers.ai or create an issue in the GitHub repository.

## 👤 User Profile System

### Profile Data Collection
The platform collects finance-specific user profile information to personalize the experience with industry-relevant insights:

**Required Fields:**
- **Full Name** (string, max 80 characters) - PII
- **Purpose/Expectation** (string, max 140 characters) - User intent with placeholder: "Analyze transcripts faster; track earnings events; summarize calls."

**Optional Fields:**
- **Industry** (searchable dropdown + "Other" option) - Finance-specific industries:
  - Investment Banking (M&A, ECM, DCM)
  - Equity Research (Sell-Side)
  - Buy-Side: Asset Management / Mutual Funds
  - Hedge Funds
  - Private Equity
  - Venture Capital
  - Wealth / Private Banking
  - Retail Brokerage
  - Commercial Banking
  - Corporate Finance / Treasury (Issuer)
  - Investor Relations (Issuer)
  - Sales & Trading (Sell-Side)
  - Proprietary / HFT Trading
  - Quantitative Finance / Market Making
  - Risk Management
  - Compliance / Regulatory (AML/KYC)
  - Credit Ratings / Research
  - Insurance / Actuarial
  - Real Estate Finance / REITs
  - Project / Infrastructure Finance
  - Sovereign Wealth / Family Office
  - Market Data / Research Providers
  - Exchanges / ATS / ECN
  - Audit / Advisory / Valuations
  - FinTech / Payments / Data Platforms
  - Other → free-text input

- **Role** (searchable dropdown + "Other" option) - Finance-specific roles:
  - Analyst (Investment Banking)
  - Associate (Investment Banking)
  - Equity Research Analyst
  - Credit Research Analyst
  - Portfolio Manager
  - Investment Analyst (Buy-Side)
  - Trader / Execution Trader
  - Quant Researcher
  - Quant Developer / Financial Engineer
  - Risk Analyst / Risk Manager
  - Compliance Officer / AML/KYC Analyst
  - Corporate Finance / Treasury Analyst
  - Corporate Development / M&A
  - Investor Relations Manager
  - Product Manager (FinTech / Data)
  - Data Scientist (Finance)
  - Derivatives Structurer
  - Credit Analyst / Underwriter
  - PE / VC Investment Associate
  - Fund Accountant / Performance
  - Strategy / BI Analyst
  - Financial Advisor / Wealth Manager
  - Operations (Middle / Back Office)
  - Other → free-text input

- **Job Function** (multi-select up to 3, with highlighted options + "Other") - Finance-specific functions:
  - Research & Analysis (highlighted)
  - Investment / Trading Execution (highlighted)
  - Valuation & Modeling
  - Diligence & Deal Execution
  - Portfolio Construction & PM
  - Risk & Limits Management
  - Compliance / Surveillance
  - Market & Macro Monitoring
  - Fundamentals / Earnings Review
  - Client Reporting & Performance
  - Data Engineering / Pipelines
  - Quant Research / Backtesting
  - Product / Platform Management
  - Pricing & Liquidity
  - Treasury / Cash Management
  - IR Communications
  - Strategy / Competitive Intel
  - Other → free-text input

### Data Classification
- **PII**: Full Name only
- **Profiling Data**: Industry, Role, Job Function, Purpose
- **Storage**: Local storage for prototype (TODO: migrate to database)

### Profile Flow
1. User completes login → Redirected to full-page Profile Info screen
2. Multi-section layout with carded sections and generous whitespace
3. Searchable dropdowns with keyboard support and "Other" handling
4. Multi-select Job Function with pill chips and highlighted popular options
5. Client-side validation for required fields with inline error messages
6. Skip-friendly flow - users can access Dashboard without completing profile
7. Dashboard shows dismissible banner if profile is incomplete
8. Profile can be completed later via banner link

### "Other" Text Capture Behavior
- When "Other" is selected in any dropdown, a compact text input appears
- Input value is persisted and included in profile data
- Allows for custom industry/role/function specification

## 🗺️ Roadmap

- [ ] Real-time WebSocket connections
- [ ] Advanced AI-powered analytics
- [ ] Mobile app development
- [ ] Advanced search filters
- [ ] User dashboard analytics
- [ ] Email notifications
- [ ] API rate limiting
- [ ] Database integration (PostgreSQL/MongoDB)

---

Built with ❤️ for financial professionals and investors.
