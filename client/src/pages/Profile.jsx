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

const Profile = () => {
  return (
    <>
      <Header />
      <Container>
        <Title>Profile</Title>
        <p>Profile page coming soon...</p>
      </Container>
    </>
  )
}

export default Profile
