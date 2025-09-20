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
  background: ${props => props.theme.colors.white};
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing[4]};
  }
`;

const FirstNamePrompt = styled.div`
  background: ${props => props.theme.colors.panel};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing[6]};
  margin-bottom: ${props => props.theme.spacing[6]};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

const FirstNamePromptContent = styled.div`
  flex: 1;
  
  h3 {
    color: ${props => props.theme.colors.heading};
    margin: 0 0 ${props => props.theme.spacing[1]} 0;
    font-size: ${props => props.theme.typography.fontSize.lg};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
  }
  
  p {
    color: ${props => props.theme.colors.muted};
    margin: 0;
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

const FirstNameForm = styled.form`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    flex-direction: column;
  }
`;

const FirstNameInput = styled.input`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.fontSize.sm};
  min-width: 200px;
  background: ${props => props.theme.colors.white};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.black};
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
  
  &.error {
    border-color: ${props => props.theme.colors.error};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    min-width: auto;
  }
`;

const FirstNameButton = styled.button`
  background: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: ${props => props.theme.colors.muted};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const FirstNameError = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.xs};
  margin-top: ${props => props.theme.spacing[1]};
  display: ${props => props.show ? 'block' : 'none'};
`;

const WelcomeSection = styled.section`
  margin-bottom: ${props => props.theme.spacing[8]};
  
  h1 {
    font-size: ${props => props.theme.typography.fontSize['4xl']};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    color: ${props => props.theme.colors.heading};
    margin: 0 0 ${props => props.theme.spacing[2]} 0;
    letter-spacing: -0.025em;
  }
  
  p {
    color: ${props => props.theme.colors.muted};
    font-size: ${props => props.theme.typography.fontSize.lg};
    margin: 0;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[5]};
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const DashboardLayout = () => {
  const { user, setFirstName } = useAuth();
  const [selectedTickers, setSelectedTickers] = useState(['AAPL', 'MSFT', 'TSLA']);
  
  // FirstName prompt state
  const [firstNameValue, setFirstNameValue] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [isSubmittingFirstName, setIsSubmittingFirstName] = useState(false);

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

        {/* Welcome Section */}
        <WelcomeSection>
          <h1>Welcome{user?.firstName ? `, ${user.firstName}` : ', there'}!</h1>
          <p>Here's what's happening in the markets today</p>
        </WelcomeSection>

        {/* Dashboard Grid */}
        <DashboardGrid>
          <LeftColumn>
            <RecentEarningsCalls 
              tickers={selectedTickers} 
            />
            <QualitativeAnalysis 
              tickers={selectedTickers} 
            />
            <QuantAnalytics 
              tickers={selectedTickers} 
            />
          </LeftColumn>
          
          <RightColumn>
            <InvestmentAnalytics 
              tickers={selectedTickers} 
            />
            <Watchlist 
              tickers={selectedTickers} 
              onTickersChange={setSelectedTickers}
            />
          </RightColumn>
        </DashboardGrid>
      </MainContent>
    </Container>
  );
};

export default DashboardLayout;