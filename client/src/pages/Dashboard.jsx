import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'
import Card from '../components/Card'
import Button from '../components/Button'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[6]};
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const ProfileBanner = styled.div`
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: ${props => props.hidden ? 'none' : 'flex'};
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
`

const ProfileBannerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const ProfileBannerIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`

const ProfileBannerText = styled.div`
  h3 {
    color: white;
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-size: 0.875rem;
  }
`

const ProfileBannerActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const ProfileBannerBtn = styled(Button)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`

const ProfileBannerDismiss = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
`

const WelcomeSection = styled.section`
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #9ca3af;
    font-size: 1.1rem;
  }
`

const SubscriptionBadge = styled.span`
  display: inline-block;
  background: #064e3b;
  color: #6ee7b7;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.5rem;
`

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #ffffff;
`

const EventsList = styled.div`
  background: #111111;
  border: 1px solid #333333;
  border-radius: 12px;
  overflow: hidden;
`

const EventItem = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #333333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.2s;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: #1a1a1a;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const EventInfo = styled.div`
  flex: 1;
`

const EventCompany = styled.div`
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.25rem;
`

const EventDetails = styled.div`
  color: #9ca3af;
  font-size: 0.9rem;
`

const EventStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: space-between;
  }
`

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  
  &.live {
    background: #ef4444;
    color: white;
  }
  
  &.upcoming {
    background: #374151;
    color: #9ca3af;
  }
`

const JoinBtn = styled(Button)`
  background: #3b82f6;
  color: white;
  
  &:hover {
    background: #2563eb;
  }
`

const ReminderBtn = styled(Button)`
  background: transparent;
  color: #9ca3af;
  border: 1px solid #333333;
  
  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
  }
`

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`

const ActionBtn = styled(Button)`
  background: #111111;
  border: 1px solid #333333;
  color: #ffffff;
  padding: 1rem;
  text-align: center;
  font-weight: 500;
  
  &:hover {
    border-color: #3b82f6;
    background: #1a1a1a;
  }
`

const Dashboard = () => {
  const { user } = useAuth()
  const [profileBannerHidden, setProfileBannerHidden] = useState(false)

  useEffect(() => {
    // Check if profile banner was previously dismissed
    const bannerDismissed = localStorage.getItem('profileBannerDismissed')
    if (bannerDismissed === 'true') {
      setProfileBannerHidden(true)
    }
  }, [])

  const dismissProfileBanner = () => {
    setProfileBannerHidden(true)
    localStorage.setItem('profileBannerDismissed', 'true')
  }

  const joinLive = (symbol) => {
    alert(`🔴 Joining live call for ${symbol}!\n\n🎙️ Live audio streaming\n📝 Real-time transcription\n📊 AI-powered insights\n\n(Live streaming coming in Days 8-10)`)
  }

  const setReminder = (symbol) => {
    alert(`⏰ Reminder set for ${symbol} earnings call!\n\n📧 Email notification enabled\n📱 Push notification enabled\n\n(Notification system coming in Days 5-7)`)
  }

  const searchTranscripts = () => {
    alert('🔍 Advanced transcript search coming in Day 5!\n\n🤖 AI-powered search\n📊 Sentiment analysis\n🎯 Keyword highlighting')
  }

  const viewWatchlist = () => {
    alert('👁️ Watchlist management coming in Day 6!\n\n⭐ Save favorite companies\n🔔 Custom alerts\n📈 Performance tracking')
  }

  const upgradeAccount = () => {
    alert('⭐ Subscription system coming in Day 7!\n\n💳 Stripe integration\n📊 Pro features\n🎯 Advanced analytics')
  }

  const viewSettings = () => {
    alert('⚙️ Account settings coming in Day 4!\n\n👤 Profile management\n🔔 Notification preferences\n🔒 Security settings')
  }

  return (
    <>
      <Header />
      <MainContent>
        {/* Profile Completion Banner */}
        <ProfileBanner hidden={profileBannerHidden}>
          <ProfileBannerContent>
            <ProfileBannerIcon>👤</ProfileBannerIcon>
            <ProfileBannerText>
              <h3>Complete your profile</h3>
              <p>Finish your profile to personalize your experience with finance-specific insights</p>
            </ProfileBannerText>
          </ProfileBannerContent>
          <ProfileBannerActions>
            <ProfileBannerBtn as="a" href="/profile-setup">Complete Profile</ProfileBannerBtn>
            <ProfileBannerDismiss onClick={dismissProfileBanner}>×</ProfileBannerDismiss>
          </ProfileBannerActions>
        </ProfileBanner>

        {/* Welcome Section */}
        <WelcomeSection>
          <h1>Welcome back, {user?.firstName || 'User'}! 👋</h1>
          <p>Here's what's happening in the markets today</p>
          <SubscriptionBadge>FREE PLAN</SubscriptionBadge>
        </WelcomeSection>

        {/* Dashboard Stats */}
        <DashboardGrid>
          <Card
            icon="🎙️"
            title="Live Events Today"
            value="12"
            description="Earnings calls happening today"
            variant="dark"
          />
          
          <Card
            icon="👁️"
            title="Watchlist"
            value="8"
            description="Companies you're following"
            variant="dark"
          />
          
          <Card
            icon="🔍"
            title="Searches"
            value="24"
            description="Searches performed this month"
            variant="dark"
          />
          
          <Card
            icon="📊"
            title="Insights"
            value="156"
            description="AI insights generated"
            variant="dark"
          />
        </DashboardGrid>

        {/* Live & Upcoming Events */}
        <section>
          <SectionTitle>🔴 Live & Upcoming Events</SectionTitle>
          <EventsList>
            <EventItem>
              <EventInfo>
                <EventCompany>Apple Inc. (AAPL)</EventCompany>
                <EventDetails>Q4 2024 Earnings Call • 4:30 PM EST</EventDetails>
              </EventInfo>
              <EventStatus>
                <StatusBadge className="live">🔴 Live</StatusBadge>
                <JoinBtn onClick={() => joinLive('AAPL')}>Join Live</JoinBtn>
              </EventStatus>
            </EventItem>
            
            <EventItem>
              <EventInfo>
                <EventCompany>Microsoft Corporation (MSFT)</EventCompany>
                <EventDetails>Q4 2024 Earnings Call • 5:00 PM EST</EventDetails>
              </EventInfo>
              <EventStatus>
                <StatusBadge className="upcoming">Upcoming</StatusBadge>
                <ReminderBtn onClick={() => setReminder('MSFT')}>Set Reminder</ReminderBtn>
              </EventStatus>
            </EventItem>
            
            <EventItem>
              <EventInfo>
                <EventCompany>Tesla, Inc. (TSLA)</EventCompany>
                <EventDetails>Q4 2024 Earnings Call • 6:00 PM EST</EventDetails>
              </EventInfo>
              <EventStatus>
                <StatusBadge className="upcoming">Upcoming</StatusBadge>
                <ReminderBtn onClick={() => setReminder('TSLA')}>Set Reminder</ReminderBtn>
              </EventStatus>
            </EventItem>
            
            <EventItem>
              <EventInfo>
                <EventCompany>Amazon.com Inc. (AMZN)</EventCompany>
                <EventDetails>Q4 2024 Earnings Call • 7:00 PM EST</EventDetails>
              </EventInfo>
              <EventStatus>
                <StatusBadge className="upcoming">Upcoming</StatusBadge>
                <ReminderBtn onClick={() => setReminder('AMZN')}>Set Reminder</ReminderBtn>
              </EventStatus>
            </EventItem>
          </EventsList>
        </section>

        {/* Quick Actions */}
        <QuickActions>
          <ActionBtn onClick={searchTranscripts}>
            🔍 Search Transcripts
          </ActionBtn>
          <ActionBtn onClick={viewWatchlist}>
            👁️ Manage Watchlist
          </ActionBtn>
          <ActionBtn onClick={upgradeAccount}>
            ⭐ Upgrade to Pro
          </ActionBtn>
          <ActionBtn onClick={viewSettings}>
            ⚙️ Account Settings
          </ActionBtn>
        </QuickActions>
      </MainContent>
    </>
  )
}

export default Dashboard
