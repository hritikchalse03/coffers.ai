import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { PROTOTYPE_CONFIG } from '../config/prototype'
import Button from './Button'

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.divider};
  z-index: 100;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[6]};
`

const Logo = styled(Link)`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.black};
  text-decoration: none;
  letter-spacing: -0.025em;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[8]};
  list-style: none;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.muted};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.black};
  }
  
  &.active {
    color: ${props => props.theme.colors.black};
  }
`

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
`

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.white};
`

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: white;
`

const LogoutBtn = styled.button`
  color: ${props => props.theme.colors.muted};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: color 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.error};
  }
`

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/')
    }
  }

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">●●● Coffers.ai</Logo>
        
        {isAuthenticated() || PROTOTYPE_CONFIG.enabled ? (
          <>
            <NavLinks>
              <NavLink 
                to="/dashboard" 
                className={location.pathname === '/dashboard' ? 'active' : ''}
              >
                Dashboard
              </NavLink>
              <NavLink to="/search">Search</NavLink>
              <NavLink to="/events">Events</NavLink>
              <NavLink to="/pricing">Pricing</NavLink>
            </NavLinks>
            
            <UserMenu>
              <UserInfo>
                <UserAvatar>
                  {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                </UserAvatar>
                <span>{user?.firstName || 'User'}</span>
              </UserInfo>
              <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
            </UserMenu>
          </>
        ) : (
          <NavActions>
            <Button as={Link} to="/login" variant="secondary">
              Sign in
            </Button>
            <Button as={Link} to="/register" variant="primary">
              Get started
            </Button>
          </NavActions>
        )}
      </Nav>
    </HeaderContainer>
  )
}

export default Header
