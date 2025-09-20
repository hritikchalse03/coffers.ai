import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/Button'
import { PROTOTYPE_CONFIG } from '../config/prototype'

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

const RegisterSection = styled.section`
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing[8]} 0;
`

const RegisterCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.sm};
  width: 100%;
  max-width: 400px;
`

const RegisterHeader = styled.div`
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

const FormSelect = styled.select`
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const FormOptions = styled.div`
  margin-bottom: ${props => props.theme.spacing[6]};
`

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[2]};
`

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${props => props.theme.colors.black};
  margin-top: 2px;
`

const CheckboxLabel = styled.label`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.muted};
  cursor: pointer;
  line-height: 1.5;
  
  a {
    color: ${props => props.theme.colors.black};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const LoginLink = styled.div`
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

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    role: '',
    investmentFocus: '',
    terms: false
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ text: '', type: '', show: false })
  const [loading, setLoading] = useState(false)
  
  const { register, isAuthenticated } = useAuth()
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

  const validatePassword = (password) => {
    return password.length >= 8
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

    if (PROTOTYPE_CONFIG.enabled) {
      // In prototype mode, only validate firstName
      let isValid = true

      if (!formData.firstName || !formData.firstName.trim()) {
        showFieldError('firstName', 'First name is required')
        isValid = false
      }

      if (!isValid) return

      setLoading(true)

      try {
        await register({ firstName: formData.firstName })
        showMessage('Welcome! Redirecting to dashboard...', 'success')
        
        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      } catch (error) {
        showMessage(error.message || 'Registration failed. Please try again.', 'error')
      } finally {
        setLoading(false)
      }
    } else {
      // Normal auth flow
      let isValid = true

      if (!formData.firstName.trim()) {
        showFieldError('firstName', 'First name is required')
        isValid = false
      }

      if (!formData.lastName.trim()) {
        showFieldError('lastName', 'Last name is required')
        isValid = false
      }

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
      } else if (!validatePassword(formData.password)) {
        showFieldError('password', 'Password must be at least 8 characters')
        isValid = false
      }

      if (!formData.confirmPassword) {
        showFieldError('confirmPassword', 'Please confirm your password')
        isValid = false
      } else if (formData.password !== formData.confirmPassword) {
        showFieldError('confirmPassword', 'Passwords do not match')
        isValid = false
      }
      
      if (!formData.company.trim()) {
        showFieldError('company', 'Company/Organization is required')
        isValid = false
      }

      if (!formData.role) {
        showFieldError('role', 'Please select your role')
        isValid = false
      }

      if (!formData.investmentFocus) {
        showFieldError('investmentFocus', 'Please select your investment focus')
        isValid = false
      }
      
      if (!formData.terms) {
        showMessage('Please accept the Terms of Service and Privacy Policy', 'error')
        isValid = false
      }

      if (!isValid) return

      setLoading(true)

      try {
        await register(formData)
        showMessage('Welcome to Coffers.ai! Your financial research account is ready. Redirecting...', 'success')
        
        setTimeout(() => {
          navigate('/profile-setup')
        }, 1000)
      } catch (error) {
        showMessage(error.message || 'Registration failed. Please try again.', 'error')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <RegisterSection>
        <ContainerSm>
          <RegisterCard>
            <RegisterHeader>
              <h1>Join Coffers.ai</h1>
              <p>Start analyzing earnings calls and market data with AI-powered insights</p>
            </RegisterHeader>

            <Message 
              show={message.show} 
              className={message.type}
            >
              {message.text}
            </Message>

            <form onSubmit={handleSubmit}>
              {PROTOTYPE_CONFIG.enabled ? (
                <FormGroup>
                  <FormLabel htmlFor="firstName">First name</FormLabel>
                  <FormInput
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className={errors.firstName ? 'error' : ''}
                    required
                  />
                  <FormError show={!!errors.firstName}>{errors.firstName}</FormError>
                </FormGroup>
              ) : (
                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="firstName">First name</FormLabel>
                    <FormInput
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className={errors.firstName ? 'error' : ''}
                      required
                    />
                    <FormError show={!!errors.firstName}>{errors.firstName}</FormError>
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="lastName">Last name</FormLabel>
                    <FormInput
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className={errors.lastName ? 'error' : ''}
                      required
                    />
                    <FormError show={!!errors.lastName}>{errors.lastName}</FormError>
                  </FormGroup>
                </FormRow>
              )}
              
              {!PROTOTYPE_CONFIG.enabled && (
                <>
                  <FormGroup>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <FormInput
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
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
                      placeholder="Create a strong password"
                      className={errors.password ? 'error' : ''}
                      required
                    />
                    <FormError show={!!errors.password}>{errors.password}</FormError>
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                    <FormInput
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className={errors.confirmPassword ? 'error' : ''}
                      required
                    />
                    <FormError show={!!errors.confirmPassword}>{errors.confirmPassword}</FormError>
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="company">Company/Organization</FormLabel>
                    <FormInput
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g., Goldman Sachs, BlackRock, or Independent"
                      className={errors.company ? 'error' : ''}
                      required
                    />
                    <FormError show={!!errors.company}>{errors.company}</FormError>
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="role">Role</FormLabel>
                    <FormSelect
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className={errors.role ? 'error' : ''}
                      required
                    >
                      <option value="">Select your role</option>
                      <option value="analyst">Financial Analyst</option>
                      <option value="portfolio-manager">Portfolio Manager</option>
                      <option value="trader">Trader</option>
                      <option value="researcher">Research Analyst</option>
                      <option value="investor">Individual Investor</option>
                      <option value="student">Student</option>
                      <option value="other">Other</option>
                    </FormSelect>
                    <FormError show={!!errors.role}>{errors.role}</FormError>
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="investmentFocus">Investment Focus</FormLabel>
                    <FormSelect
                      id="investmentFocus"
                      name="investmentFocus"
                      value={formData.investmentFocus}
                      onChange={handleInputChange}
                      className={errors.investmentFocus ? 'error' : ''}
                      required
                    >
                      <option value="">Select your focus</option>
                      <option value="equities">Equities</option>
                      <option value="bonds">Fixed Income</option>
                      <option value="commodities">Commodities</option>
                      <option value="crypto">Cryptocurrency</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="multi-asset">Multi-Asset</option>
                      <option value="other">Other</option>
                    </FormSelect>
                    <FormError show={!!errors.investmentFocus}>{errors.investmentFocus}</FormError>
                  </FormGroup>
                  
                  <FormOptions>
                    <CheckboxGroup>
                      <Checkbox
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleInputChange}
                        required
                      />
                      <CheckboxLabel htmlFor="terms">
                        I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a> for Coffers.ai financial research platform
                      </CheckboxLabel>
                    </CheckboxGroup>
                  </FormOptions>
                </>
              )}
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                {PROTOTYPE_CONFIG.enabled ? 'Continue to Dashboard' : 'Create account'}
              </Button>
            </form>
            
            <LoginLink>
              Already have an account? <Link to="/login">Sign in</Link>
            </LoginLink>
          </RegisterCard>
        </ContainerSm>
      </RegisterSection>
    </>
  )
}

export default Register
