import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { PROTOTYPE_CONFIG } from '../../config/prototype';
import Header from '../Header';
import RecentEarningsCalls from './RecentEarningsCalls';
import QualitativeAnalysis from './QualitativeAnalysis';
import QuantAnalytics from './QuantAnalytics';
import InvestmentAnalytics from './InvestmentAnalytics';
import Watchlist from './Watchlist';

const Container = styled.div`
  min-height: 100vh;
  background: #FFFFFF;
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ProfileBanner = styled.div`
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  display: ${props => props.hidden ? 'none' : 'flex'};
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
`;

const ProfileBannerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileBannerIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ProfileBannerText = styled.div`
  h3 {
    color: white;
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-size: 14px;
  }
`;

const ProfileBannerActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ProfileBannerBtn = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const ProfileBannerDismiss = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const WelcomeSection = styled.section`
  margin-bottom: 24px;
  
  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 8px 0;
  }
  
  p {
    color: #6B7280;
    font-size: 16px;
    margin: 0;
  }
`;

const RefreshIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 16px;
`;

const RefreshButton = styled.button`
  background: none;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    border-color: #9CA3AF;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AutoRefreshToggle = styled.button`
  background: none;
  border: none;
  color: #6B7280;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;

  &:hover {
    color: #374151;
  }
`;

const FirstNamePrompt = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FirstNamePromptContent = styled.div`
  flex: 1;
  
  h3 {
    color: #111827;
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
  }
  
  p {
    color: #6B7280;
    margin: 0;
    font-size: 14px;
  }
`;

const FirstNameForm = styled.form`
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const FirstNameInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: #111827;
    box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.1);
  }
  
  &.error {
    border-color: #DC2626;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }
`;

const FirstNameButton = styled.button`
  background: #111827;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #374151;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FirstNameError = styled.div`
  color: #DC2626;
  font-size: 12px;
  margin-top: 4px;
  display: ${props => props.show ? 'block' : 'none'};
`;

const DashboardLayout = () => {
  const { user, setFirstName } = useAuth();
  const [profileBannerHidden, setProfileBannerHidden] = useState(false);
  const [selectedTickers, setSelectedTickers] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // FirstName prompt state
  const [firstNameValue, setFirstNameValue] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [isSubmittingFirstName, setIsSubmittingFirstName] = useState(false);

  useEffect(() => {
    // Check if profile banner was previously dismissed
    const bannerDismissed = localStorage.getItem('profileBannerDismissed');
    if (bannerDismissed === 'true') {
      setProfileBannerHidden(true);
    }
  }, []);

  useEffect(() => {
    // Auto-refresh every 30 seconds if enabled
    if (!autoRefreshEnabled) return;

    const interval = setInterval(() => {
      handleRefresh();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefreshEnabled]);

  const dismissProfileBanner = () => {
    setProfileBannerHidden(true);
    localStorage.setItem('profileBannerDismissed', 'true');
  };

  const handleTickersChange = (tickers) => {
    setSelectedTickers(tickers);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setLastRefresh(Date.now());
    
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsRefreshing(false);
  };

  const toggleAutoRefresh = () => {
    setAutoRefreshEnabled(!autoRefreshEnabled);
  };

  const formatLastRefresh = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const handleFirstNameSubmit = async (e) => {
    e.preventDefault();
    
    if (!firstNameValue.trim()) {
      setFirstNameError('First name is required');
      return;
    }
    
    setIsSubmittingFirstName(true);
    setFirstNameError('');
    
    try {
      setFirstName(firstNameValue);
      setFirstNameValue('');
    } catch (error) {
      setFirstNameError(error.message || 'Failed to save name');
    } finally {
      setIsSubmittingFirstName(false);
    }
  };

  // Check if we need to show firstName prompt
  const needsFirstName = PROTOTYPE_CONFIG.enabled && (!user || !user.firstName);

  return (
    <Container>
      <Header />
      <MainContent>
        {/* FirstName Prompt for Prototype Mode */}
        {needsFirstName && (
          <FirstNamePrompt>
            <FirstNamePromptContent>
              <h3>Welcome to the Dashboard</h3>
              <p>Please enter your first name to personalize your experience</p>
            </FirstNamePromptContent>
            <FirstNameForm onSubmit={handleFirstNameSubmit}>
              <div>
                <FirstNameInput
                  type="text"
                  value={firstNameValue}
                  onChange={(e) => setFirstNameValue(e.target.value)}
                  placeholder="Enter your first name"
                  className={firstNameError ? 'error' : ''}
                  maxLength={50}
                />
                <FirstNameError show={!!firstNameError}>
                  {firstNameError}
                </FirstNameError>
              </div>
              <FirstNameButton
                type="submit"
                disabled={isSubmittingFirstName}
              >
                {isSubmittingFirstName ? 'Saving...' : 'Continue'}
              </FirstNameButton>
            </FirstNameForm>
          </FirstNamePrompt>
        )}

        {/* Profile Completion Banner */}
        <ProfileBanner hidden={profileBannerHidden || needsFirstName}>
          <ProfileBannerContent>
            <ProfileBannerIcon>👤</ProfileBannerIcon>
            <ProfileBannerText>
              <h3>Finish your profile</h3>
              <p>Complete your profile to personalize your experience with finance-specific insights</p>
            </ProfileBannerText>
          </ProfileBannerContent>
          <ProfileBannerActions>
            <ProfileBannerBtn as="a" href="/profile-setup">
              Complete Profile
            </ProfileBannerBtn>
            <ProfileBannerDismiss onClick={dismissProfileBanner}>
              ×
            </ProfileBannerDismiss>
          </ProfileBannerActions>
        </ProfileBanner>

        {/* Welcome Section */}
        <WelcomeSection>
          <h1>Welcome{user?.firstName ? `, ${user.firstName}` : ', there'}!</h1>
          <p>Here's what's happening in the markets today</p>
        </WelcomeSection>

        {/* Refresh Controls */}
        <RefreshIndicator>
          <RefreshButton 
            onClick={handleRefresh} 
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </RefreshButton>
          <span>Last updated: {formatLastRefresh(lastRefresh)}</span>
          <AutoRefreshToggle onClick={toggleAutoRefresh}>
            {autoRefreshEnabled ? 'Disable' : 'Enable'} auto-refresh
          </AutoRefreshToggle>
        </RefreshIndicator>

        {/* Dashboard Grid */}
        <DashboardGrid>
          <LeftColumn>
            <RecentEarningsCalls 
              tickers={selectedTickers} 
              onRefresh={handleRefresh}
            />
            <QualitativeAnalysis 
              tickers={selectedTickers} 
              onRefresh={handleRefresh}
            />
            <QuantAnalytics 
              tickers={selectedTickers} 
              onRefresh={handleRefresh}
            />
          </LeftColumn>
          
          <RightColumn>
            <InvestmentAnalytics 
              tickers={selectedTickers} 
              onRefresh={handleRefresh}
            />
            <Watchlist 
              tickers={selectedTickers} 
              onTickersChange={handleTickersChange}
            />
          </RightColumn>
        </DashboardGrid>
      </MainContent>
    </Container>
  );
};

export default DashboardLayout;
