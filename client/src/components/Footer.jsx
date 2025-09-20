import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  padding: ${props => props.theme.spacing[16]} 0;
  border-top: 1px solid ${props => props.theme.colors.divider};
  background-color: ${props => props.theme.colors.white};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[6]};
`

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing[8]};
`

const FooterSection = styled.div`
  h4 {
    margin-bottom: ${props => props.theme.spacing[4]};
    font-size: ${props => props.theme.typography.fontSize.sm};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  ul {
    list-style: none;
  }
  
  a {
    color: ${props => props.theme.colors.muted};
    text-decoration: none;
    font-size: ${props => props.theme.typography.fontSize.sm};
    line-height: 2;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${props => props.theme.colors.black};
    }
  }
`

const FooterBottom = styled.div`
  margin-top: ${props => props.theme.spacing[8]};
  padding-top: ${props => props.theme.spacing[8]};
  border-top: 1px solid ${props => props.theme.colors.divider};
  text-align: center;
  color: ${props => props.theme.colors.muted};
  font-size: ${props => props.theme.typography.fontSize.sm};
`

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#api">API</a></li>
              <li><a href="#integrations">Integrations</a></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h4>Resources</h4>
            <ul>
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#status">Status</a></li>
              <li><a href="#changelog">Changelog</a></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#terms">Terms</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#cookies">Cookies</a></li>
            </ul>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <p>&copy; 2024 Coffers.ai. All rights reserved.</p>
        </FooterBottom>
      </Container>
    </FooterContainer>
  )
}

export default Footer
