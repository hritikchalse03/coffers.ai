import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

const Title = styled.h1`
  margin-bottom: 2rem;
`

const ProfileSettings = () => {
  return (
    <>
      <Header />
      <Container>
        <Title>Profile Settings</Title>
        <p>Profile settings page coming soon...</p>
      </Container>
    </>
  )
}

export default ProfileSettings
