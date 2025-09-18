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
