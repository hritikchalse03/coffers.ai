import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Title = styled.h1`
  margin-bottom: 2rem;
`

const Events = () => {
  return (
    <>
      <Header />
      <Container>
        <Title>Events</Title>
        <p>Events page coming soon...</p>
      </Container>
    </>
  )
}

export default Events
