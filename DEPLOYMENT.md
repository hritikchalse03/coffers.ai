# Deployment Guide for coffers.ai

## 🚀 GitHub Repository Setup

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Fill in the repository details:
   - **Repository name**: `coffers-ai`
   - **Description**: `coffers.ai - A comprehensive financial research platform for live earnings calls and real-time transcripts`
   - **Visibility**: Choose Public or Private
   - **Initialize**: Don't check any boxes (we already have files)
4. Click "Create repository"

### Step 2: Connect Local Repository to GitHub

Run these commands in your project directory:

```bash
# Add GitHub remote (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/coffers-ai.git

# Rename default branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## 🌐 Vercel Deployment

### Method 1: Deploy via Vercel CLI

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy from your project directory**:
```bash
vercel
```

4. **Follow the prompts**:
   - Set up and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No**
   - Project name: **coffers-ai** (or your preferred name)
   - Directory: **./** (current directory)
   - Override settings? **No**

### Method 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
5. Click "Deploy"

## 🔧 Environment Variables Setup

### In Vercel Dashboard:

1. Go to your project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `JWT_SECRET` | `your-super-secret-jwt-key-here` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `PORT` | `3000` | Production, Preview, Development |

### Generate a secure JWT secret:

```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 64
```

## 📝 Post-Deployment Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables configured
- [ ] Domain verified (if using custom domain)
- [ ] SSL certificate active
- [ ] API endpoints tested
- [ ] Frontend accessible

## 🔍 Testing Your Deployment

### Test API Endpoints:

```bash
# Test basic endpoint
curl https://your-app-name.vercel.app/api/companies

# Test search
curl "https://your-app-name.vercel.app/api/search?q=Apple"

# Test events
curl https://your-app-name.vercel.app/api/events
```

### Test Frontend:
- Visit your Vercel URL
- Test user registration
- Test user login
- Test search functionality
- Test responsive design on mobile

## 🚨 Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in package.json
   - Check for syntax errors

2. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names are exact matches
   - Redeploy after adding new variables

3. **API Issues**:
   - Check CORS settings
   - Verify route configurations in vercel.json
   - Check server logs in Vercel dashboard

4. **Static Files**:
   - Ensure vercel.json routes are correct
   - Check file paths are case-sensitive
   - Verify static file serving configuration

## 📊 Monitoring

- **Vercel Analytics**: Enable in project settings
- **Function Logs**: Check in Vercel dashboard
- **Performance**: Monitor in Vercel dashboard
- **Uptime**: Use external monitoring services

## 🔄 Updates and Maintenance

### To update your deployment:

1. Make changes to your code
2. Commit changes:
```bash
git add .
git commit -m "Update description"
git push origin main
```
3. Vercel will automatically redeploy

### To update environment variables:
1. Go to Vercel dashboard
2. Update variables in Settings
3. Redeploy manually if needed

## 🎯 Next Steps

After successful deployment:

1. **Custom Domain**: Add your custom domain in Vercel
2. **Database**: Consider adding a real database (MongoDB, PostgreSQL)
3. **Monitoring**: Set up error tracking (Sentry)
4. **Analytics**: Add Google Analytics or similar
5. **CI/CD**: Set up automated testing
6. **Security**: Add rate limiting and security headers

---

Your coffers.ai platform should now be live and accessible worldwide! 🎉
