import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Card from '../components/Card'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[6]};
`

const ContainerSm = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[6]};
`

const Hero = styled.section`
  padding: ${props => props.theme.spacing[24]} 0;
  text-align: center;
  
  h1 {
    margin-bottom: ${props => props.theme.spacing[6]};
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
  
  p {
    font-size: ${props => props.theme.typography.fontSize.xl};
    margin-bottom: ${props => props.theme.spacing[10]};
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`

const HeroActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  justify-content: center;
  flex-wrap: wrap;
`

const ValueGrid = styled.section`
  padding: ${props => props.theme.spacing[24]} 0;
  background-color: ${props => props.theme.colors.panel};
  
  h2 {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing[16]};
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing[8]};
`

const HowItWorks = styled.section`
  padding: ${props => props.theme.spacing[24]} 0;
  
  h2 {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing[16]};
  }
`

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing[12]};
`

const Step = styled.div`
  text-align: center;
`

const StepNumber = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  border-radius: 50%;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing[4]};
`

const Trust = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background-color: ${props => props.theme.colors.panel};
  text-align: center;
  
  h3 {
    margin-bottom: ${props => props.theme.spacing[8]};
    color: ${props => props.theme.colors.muted};
    font-size: ${props => props.theme.typography.fontSize.sm};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`

const TrustLogos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing[12]};
  flex-wrap: wrap;
`

const TrustLogo = styled.div`
  color: ${props => props.theme.colors.muted};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`

const Home = () => {
  return (
    <>
      <Header />
      
      <Hero>
        <ContainerSm>
          <h1>Qualitative & Quantitative analysis to make precise, actionable financial decisions</h1>
          <p>Get actionable insights from earnings calls and market data without reading long transcripts</p>
          <HeroActions>
            <Button as={Link} to="/register" variant="primary" size="large">
              Get started
            </Button>
            <Button as={Link} to="#demo" variant="secondary" size="large">
              See a demo
            </Button>
          </HeroActions>
        </ContainerSm>
      </Hero>

      <ValueGrid id="product">
        <Container>
          <h2>Everything you need for earnings analysis</h2>
          <Grid>
            <Card
              icon="🎙️"
              title="Live Earnings Calls"
              description="Real-time earnings call transcripts with AI-powered analysis and key moment extraction"
            />
            <Card
              icon="📊"
              title="Market Data Analysis"
              description="Comprehensive market data integration with contextual analysis and correlation insights"
            />
            <Card
              icon="🤖"
              title="AI-Powered Insights"
              description="Instant analysis of earnings calls with sentiment tracking and trend identification"
            />
            <Card
              icon="⚡"
              title="Real-Time Updates"
              description="Live market data feeds with earnings call notifications and price correlation alerts"
            />
          </Grid>
        </Container>
      </ValueGrid>

      <HowItWorks>
        <Container>
          <h2>How it works</h2>
          <Steps>
            <Step>
              <StepNumber>1</StepNumber>
              <h3>Search company</h3>
              <p>Find any public company by ticker symbol or name. Access comprehensive earnings data and market analysis</p>
            </Step>
            <Step>
              <StepNumber>2</StepNumber>
              <h3>Join earnings call</h3>
              <p>Join live earnings calls or access archived transcripts. Real-time transcription with instant AI processing</p>
            </Step>
            <Step>
              <StepNumber>3</StepNumber>
              <h3>Analyze with AI</h3>
              <p>Get instant insights, key moments, sentiment analysis, and actionable recommendations powered by advanced AI</p>
            </Step>
          </Steps>
        </Container>
      </HowItWorks>

      <Trust>
        <Container>
          <h3>Trusted by financial professionals</h3>
          <TrustLogos>
            <TrustLogo>Goldman Sachs</TrustLogo>
            <TrustLogo>Morgan Stanley</TrustLogo>
            <TrustLogo>BlackRock</TrustLogo>
            <TrustLogo>Vanguard</TrustLogo>
            <TrustLogo>Fidelity</TrustLogo>
          </TrustLogos>
        </Container>
      </Trust>

      <Footer />
    </>
  )
}

export default Home
