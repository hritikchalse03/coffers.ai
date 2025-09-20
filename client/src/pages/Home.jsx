import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
    <Container>
      <Hero>
        <ContainerSm>
          <h1>Welcome to Coffers.ai</h1>
          <p>Test page - if you can see this, React is working!</p>
          <HeroActions>
            <Link to="/login" style={{ 
              background: '#0A0A0A', 
              color: 'white', 
              padding: '12px 24px', 
              textDecoration: 'none', 
              borderRadius: '8px',
              display: 'inline-block',
              marginRight: '16px'
            }}>
              Go to Login
            </Link>
            <Link to="/dashboard" style={{ 
              background: '#F3F4F6', 
              color: '#0A0A0A', 
              padding: '12px 24px', 
              textDecoration: 'none', 
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              Go to Dashboard
            </Link>
          </HeroActions>
        </ContainerSm>
      </Hero>
    </Container>
  )
}

export default Home
