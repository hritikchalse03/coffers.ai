import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  ${props => props.variant === 'dark' && `
    background-color: #111111;
    border-color: #333333;
    color: white;
    
    &:hover {
      border-color: ${props.theme.colors.primary};
    }
  `}
  
  ${props => props.padding && `
    padding: ${props.padding};
  `}
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing[4]};
`

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.typography.fontSize.lg};
  margin-right: ${props => props.theme.spacing[4]};
`

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.variant === 'dark' ? 'white' : props.theme.colors.heading};
  margin: 0;
`

const CardValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing[2]};
`

const CardDescription = styled.p`
  color: ${props => props.variant === 'dark' ? '#9ca3af' : props.theme.colors.muted};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin: 0;
`

const Card = ({ 
  children, 
  variant = 'light', 
  padding, 
  icon, 
  title, 
  value, 
  description, 
  ...props 
}) => {
  if (icon || title || value || description) {
    return (
      <CardContainer variant={variant} padding={padding} {...props}>
        {(icon || title) && (
          <CardHeader>
            {icon && <CardIcon>{icon}</CardIcon>}
            {title && <CardTitle variant={variant}>{title}</CardTitle>}
          </CardHeader>
        )}
        {value && <CardValue>{value}</CardValue>}
        {description && <CardDescription variant={variant}>{description}</CardDescription>}
        {children}
      </CardContainer>
    )
  }

  return (
    <CardContainer variant={variant} padding={padding} {...props}>
      {children}
    </CardContainer>
  )
}

export default Card
