const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const PROTOTYPE_AUTH = process.env.PROTOTYPE_AUTH !== 'false'; // Default to true

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// In-memory database (replace with real database in production)
let users = [];
let watchlists = [];
let alerts = [];
let userProfiles = [];
let companies = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 189.84,
        change: 2.34,
        changePercent: 1.25,
        marketCap: '2.95T',
        sector: 'Technology'
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 374.12,
        change: 5.67,
        changePercent: 1.54,
        marketCap: '2.78T',
        sector: 'Technology'
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 138.45,
        change: -1.23,
        changePercent: -0.88,
        marketCap: '1.74T',
        sector: 'Technology'
    },
    {
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        price: 248.91,
        change: 12.45,
        changePercent: 5.26,
        marketCap: '789B',
        sector: 'Automotive'
    }
];

let events = [
    {
        id: '1',
        company: 'AAPL',
        title: 'Q4 2024 Earnings Call',
        type: 'earnings',
        status: 'live',
        startTime: new Date(),
        attendees: 1247,
        description: 'Apple reports Q4 2024 results with record revenue of $94.9B.'
    },
    {
        id: '2',
        company: 'TSLA',
        title: 'Investor Day Presentation',
        type: 'investor-day',
        status: 'live',
        startTime: new Date(),
        attendees: 2156,
        description: 'Tesla presents latest developments in autonomous driving.'
    }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
    // In prototype mode, bypass authentication
    if (PROTOTYPE_AUTH) {
        req.user = { id: 'prototype-user', email: 'prototype@example.com' };
        return next();
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Helper function to generate tokens
const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
    return { accessToken };
};

// Routes

// Serve React build files
app.use(express.static(path.join(__dirname, 'client/dist')));

// Serve HTML pages (fallback for non-React pages)
app.get('/pages/:page', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', req.params.page));
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        if (PROTOTYPE_AUTH) {
            // In prototype mode, just return success
            const { firstName } = req.body;
            return res.status(201).json({
                message: 'Registration successful',
                user: { firstName: firstName || 'User' }
            });
        }

        const { firstName, lastName, email, password, company, role, investmentFocus } = req.body;

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = {
            id: Date.now().toString(),
            firstName,
            lastName,
            email,
            password: hashedPassword,
            company: company || '',
            role: role || '',
            investmentFocus: investmentFocus || '',
            tier: 'free',
            createdAt: new Date(),
            stats: {
                companiesFollowed: 0,
                eventsAttended: 0,
                activeAlerts: 0,
                daysActive: 1
            }
        };

        users.push(user);

        // Generate tokens
        const tokens = generateTokens(user);

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                company: user.company,
                role: user.role,
                investmentFocus: user.investmentFocus,
                tier: user.tier,
                stats: user.stats
            },
            ...tokens
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        if (PROTOTYPE_AUTH) {
            // In prototype mode, just return success
            const { firstName } = req.body;
            return res.json({
                message: 'Login successful',
                user: { firstName: firstName || 'User' }
            });
        }

        const { email, password } = req.body;

        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate tokens
        const tokens = generateTokens(user);

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                company: user.company,
                role: user.role,
                investmentFocus: user.investmentFocus,
                tier: user.tier,
                stats: user.stats
            },
            ...tokens
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Company Routes
app.get('/api/companies', (req, res) => {
    const { search, sector } = req.query;
    let filteredCompanies = companies;

    if (search) {
        filteredCompanies = filteredCompanies.filter(company =>
            company.name.toLowerCase().includes(search.toLowerCase()) ||
            company.symbol.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (sector) {
        filteredCompanies = filteredCompanies.filter(company =>
            company.sector.toLowerCase() === sector.toLowerCase()
        );
    }

    res.json(filteredCompanies);
});

app.get('/api/companies/:symbol', (req, res) => {
    const company = companies.find(c => c.symbol === req.params.symbol);
    if (!company) {
        return res.status(404).json({ error: 'Company not found' });
    }

    res.json({
        ...company,
        financials: {
            revenue: '383.3B',
            netIncome: '97.0B',
            eps: '6.16',
            peRatio: '28.5'
        },
        recentEvents: [
            {
                id: '1',
                title: 'Q4 2024 Earnings Call',
                date: new Date(),
                type: 'earnings'
            }
        ]
    });
});

// Watchlist Routes
app.get('/api/watchlists', authenticateToken, (req, res) => {
    const userWatchlists = watchlists.filter(w => w.userId === req.user.id);
    res.json(userWatchlists);
});

app.post('/api/watchlists', authenticateToken, (req, res) => {
    const { name, companies: watchlistCompanies } = req.body;

    const watchlist = {
        id: Date.now().toString(),
        userId: req.user.id,
        name,
        companies: watchlistCompanies || [],
        createdAt: new Date()
    };

    watchlists.push(watchlist);
    res.status(201).json(watchlist);
});

// Events Routes
app.get('/api/events', (req, res) => {
    const { status, company } = req.query;
    let filteredEvents = events;

    if (status) {
        filteredEvents = filteredEvents.filter(e => e.status === status);
    }

    if (company) {
        filteredEvents = filteredEvents.filter(e => e.company === company);
    }

    res.json(filteredEvents);
});

// User Profile Routes
app.get('/api/user/profile', authenticateToken, (req, res) => {
    const profile = userProfiles.find(p => p.userId === req.user.id);
    if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
});

app.post('/api/user/profile', authenticateToken, (req, res) => {
    try {
        const { fullName, industry, role, jobFunction, purpose } = req.body;

        // Validation
        if (!fullName || !fullName.trim()) {
            return res.status(400).json({ error: 'Full name is required' });
        }

        if (!purpose || !purpose.trim()) {
            return res.status(400).json({ error: 'Purpose is required' });
        }

        if (fullName.length > 80) {
            return res.status(400).json({ error: 'Full name must be 80 characters or less' });
        }

        if (purpose.length > 140) {
            return res.status(400).json({ error: 'Purpose must be 140 characters or less' });
        }

        // Check if profile already exists
        const existingProfileIndex = userProfiles.findIndex(p => p.userId === req.user.id);
        
        const profileData = {
            userId: req.user.id,
            fullName: fullName.trim(),
            industry: industry || null,
            role: role || null,
            jobFunction: jobFunction || null,
            purpose: purpose.trim(),
            updatedAt: new Date()
        };

        if (existingProfileIndex >= 0) {
            // Update existing profile
            userProfiles[existingProfileIndex] = {
                ...userProfiles[existingProfileIndex],
                ...profileData
            };
            console.log(`Profile updated for user ${req.user.id}`);
        } else {
            // Create new profile
            profileData.createdAt = new Date();
            userProfiles.push(profileData);
            console.log(`Profile created for user ${req.user.id}`);
        }

        res.json({
            message: 'Profile saved successfully',
            profile: profileData
        });
    } catch (error) {
        console.error('Profile save error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Search Routes
app.get('/api/search', (req, res) => {
    const { q, type } = req.query;
    const results = [];

    if (!q) {
        return res.json({ results: [], total: 0 });
    }

    // Search companies
    if (!type || type === 'companies') {
        const companyResults = companies.filter(company =>
            company.name.toLowerCase().includes(q.toLowerCase()) ||
            company.symbol.toLowerCase().includes(q.toLowerCase())
        ).map(company => ({
            type: 'company',
            id: company.symbol,
            title: company.name,
            subtitle: company.symbol,
            data: company
        }));
        results.push(...companyResults);
    }

    res.json({
        results: results.slice(0, 50),
        total: results.length,
        query: q
    });
});

// Real-time price updates (simulate)
const updatePrices = () => {
    companies.forEach(company => {
        const changePercent = (Math.random() - 0.5) * 0.1; // ±5% max change
        const newPrice = company.price * (1 + changePercent);
        const change = newPrice - company.price;
        
        company.price = Math.round(newPrice * 100) / 100;
        company.change = Math.round(change * 100) / 100;
        company.changePercent = Math.round(changePercent * 10000) / 100;
    });
};

// Update prices every 30 seconds
setInterval(updatePrices, 30000);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Coffers.ai Backend Server running on http://localhost:${PORT}`);
    
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
    console.log(`🌐 Frontend available at http://localhost:${PORT}`);
    
    if (PROTOTYPE_AUTH) {
        console.log(`🔓 PROTOTYPE MODE ENABLED - Authentication bypassed for all routes`);
    } else {
        console.log(`🔒 NORMAL AUTH MODE - Authentication required for protected routes`);
    }
});