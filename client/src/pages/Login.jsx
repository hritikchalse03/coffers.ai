import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/Button'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[6]};
`

const ContainerSm = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[6]};
`

const LoginSection = styled.section`
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing[8]} 0;
`

const LoginCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.sm};
  width: 100%;
  max-width: 400px;
`

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[8]};
  
  h1 {
    font-size: ${props => props.theme.typography.fontSize['2xl']};
    margin-bottom: ${props => props.theme.spacing[2]};
  }
  
  p {
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing[6]};
`

const FormLabel = styled.label`
  display: block;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.heading};
  margin-bottom: ${props => props.theme.spacing[2]};
`

const FormInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: ${props => props.theme.colors.white};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.black};
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
  
  &.error {
    border-color: ${props => props.theme.colors.error};
  }
  
  &.error:focus {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
`

const FormError = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.xs};
  margin-top: ${props => props.theme.spacing[1]};
  display: ${props => props.show ? 'block' : 'none'};
`

const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing[4]};
    align-items: flex-start;
  }
`

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
`

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${props => props.theme.colors.black};
`

const CheckboxLabel = styled.label`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.muted};
  cursor: pointer;
`

const ForgotPassword = styled(Link)`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.black};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  
  &:hover {
    text-decoration: underline;
  }
`

const SignupLink = styled.div`
  text-align: center;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.muted};
  
  a {
    color: ${props => props.theme.colors.black};
    text-decoration: none;
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const Message = styled.div`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing[4]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  display: ${props => props.show ? 'block' : 'none'};
  
  &.success {
    background-color: #F0FDF4;
    color: ${props => props.theme.colors.success};
    border: 1px solid #BBF7D0;
  }
  
  &.error {
    background-color: #FEF2F2;
    color: ${props => props.theme.colors.error};
    border: 1px solid #FECACA;
  }
`

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ text: '', type: '', show: false })
  const [loading, setLoading] = useState(false)
  
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const showMessage = (text, type) => {
    setMessage({ text, type, show: true })
    setTimeout(() => {
      setMessage({ text: '', type: '', show: false })
    }, 5000)
  }

  const showFieldError = (field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }))
  }

  const clearFieldError = (field) => {
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    clearFieldError(name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Clear previous errors
    setErrors({})

    // Validate form
    let isValid = true

    if (!formData.email) {
      showFieldError('email', 'Email is required')
      isValid = false
    } else if (!validateEmail(formData.email)) {
      showFieldError('email', 'Please enter a valid email address')
      isValid = false
    }

    if (!formData.password) {
      showFieldError('password', 'Password is required')
      isValid = false
    }

    if (!isValid) return

    setLoading(true)

    try {
      await login(formData)
      showMessage('Welcome back! Setting up your profile...', 'success')
      
      setTimeout(() => {
        navigate('/profile-setup')
      }, 1000)
    } catch (error) {
      showMessage(error.message || 'Login failed. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <LoginSection>
        <ContainerSm>
          <LoginCard>
            <LoginHeader>
              <h1>Welcome back to Coffers.ai</h1>
              <p>Access your financial research dashboard and earnings analysis tools</p>
            </LoginHeader>

            <Message 
              show={message.show} 
              className={message.type}
            >
              {message.text}
            </Message>

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'error' : ''}
                  required
                />
                <FormError show={!!errors.email}>{errors.email}</FormError>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormInput
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                  required
                />
                <FormError show={!!errors.password}>{errors.password}</FormError>
              </FormGroup>

              <FormOptions>
                <CheckboxGroup>
                  <Checkbox
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInputChange}
                  />
                  <CheckboxLabel htmlFor="remember">Remember me</CheckboxLabel>
                </CheckboxGroup>
                <ForgotPassword to="#forgot">Forgot password?</ForgotPassword>
              </FormOptions>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                Sign in
              </Button>
            </form>

            <SignupLink>
              Don't have an account? <Link to="/register">Sign up</Link>
            </SignupLink>
          </LoginCard>
        </ContainerSm>
      </LoginSection>
    </>
  )
}

export default Login
