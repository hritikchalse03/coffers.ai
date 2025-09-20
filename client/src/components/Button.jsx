import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  font-size: ${props => props.theme.typography.fontSize.sm};
  min-height: 40px;
  
  ${props => props.variant === 'primary' && `
    background-color: ${props.theme.colors.black};
    color: ${props.theme.colors.white};
    
    &:hover:not(:disabled) {
      background-color: ${props.theme.colors.heading};
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: transparent;
    color: ${props.theme.colors.muted};
    border: 1px solid ${props.theme.colors.divider};
    
    &:hover:not(:disabled) {
      background-color: ${props.theme.colors.hover};
      color: ${props.theme.colors.black};
    }
  `}
  
  ${props => props.variant === 'outline' && `
    background-color: transparent;
    color: ${props.theme.colors.black};
    border: 1px solid ${props.theme.colors.black};
    
    &:hover:not(:disabled) {
      background-color: ${props.theme.colors.black};
      color: ${props.theme.colors.white};
    }
  `}
  
  ${props => props.size === 'small' && `
    padding: ${props.theme.spacing[2]} ${props.theme.spacing[4]};
    font-size: ${props.theme.typography.fontSize.xs};
    min-height: 32px;
  `}
  
  ${props => props.size === 'large' && `
    padding: ${props.theme.spacing[4]} ${props.theme.spacing[8]};
    font-size: ${props.theme.typography.fontSize.lg};
    min-height: 48px;
  `}
  
  ${props => props.fullWidth && `
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &.loading {
    position: relative;
    color: transparent;
    
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      top: 50%;
      left: 50%;
      margin-left: -8px;
      margin-top: -8px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false, 
  loading = false, 
  disabled = false,
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      className={loading ? 'loading' : ''}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export default Button
