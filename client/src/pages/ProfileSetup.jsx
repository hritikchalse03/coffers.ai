import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/Button'

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`

const Card = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`

const Description = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.muted};
  margin-bottom: 2rem;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.divider};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    industry: '',
    role: '',
    jobFunction: '',
    purpose: ''
  })
  const [loading, setLoading] = useState(false)
  
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update user with profile data
      const updatedUser = { ...user, profile: formData }
      updateUser(updatedUser)
      
      // Store profile in localStorage
      localStorage.setItem('coffers_profile', JSON.stringify(formData))
      
      alert('Profile completed successfully!')
      navigate('/dashboard')
    } catch (error) {
      alert('Error saving profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Card>
        <Title>Complete Your Profile</Title>
        <Description>
          Help us personalize your experience with finance-specific insights
        </Description>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="industry">Industry</Label>
            <Input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              placeholder="e.g., Financial Services, Technology"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="role">Role</Label>
            <Input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="e.g., Portfolio Manager, Analyst"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="jobFunction">Job Function</Label>
            <Input
              type="text"
              id="jobFunction"
              name="jobFunction"
              value={formData.jobFunction}
              onChange={handleInputChange}
              placeholder="e.g., Investment Management, Research"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="purpose">Purpose *</Label>
            <TextArea
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              placeholder="Tell us how you plan to use Coffers.ai for your financial research"
              required
            />
          </FormGroup>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Complete Profile
          </Button>
        </form>
      </Card>
    </Container>
  )
}

export default ProfileSetup
